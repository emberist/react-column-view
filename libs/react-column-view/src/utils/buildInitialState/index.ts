import { omit, values } from 'lodash';
import { InitialState, Item, State } from '../../types';

export const buildInitialState = <T extends Record<string, unknown>>(
  initialNodes?: InitialState,
  initialPath?: string[]
): State<T> => {
  if (!initialNodes) {
    return {
      nodes: {},
      path: [],
      root: [],
    };
  }

  const nodes = initialNodes.reduce((acc: Record<string, Item<T>>, item) => {
    const parentId = initialNodes.find((node) =>
      node.children.includes(item.id)
    )?.id;

    acc[item.id] = {
      ...item,
      parentId,
      original: omit(item, ['children']) as unknown as T,
    };

    return acc;
  }, {});

  return {
    path: initialPath ?? [],
    root: values(nodes)
      .filter((node) => !node.parentId)
      .map((node) => node.id),
    nodes,
  };
};

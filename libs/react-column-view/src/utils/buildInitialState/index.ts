import { omit, values } from 'lodash';
import { ColumnItem, InitialState, State } from '../../types';

export const buildInitialState = <T extends Record<string, unknown>>(
  nodes: InitialState
): State<T> => {
  const data = nodes.reduce((acc: Record<string, ColumnItem<T>>, item) => {
    const parentId = nodes.find((node) => node.children.includes(item.id))?.id;

    acc[item.id] = {
      ...item,
      parentId,
      data: omit(item, ['children']) as unknown as T,
    };

    return acc;
  }, {});

  return {
    path: [],
    root: values(data)
      .filter((node) => !node.parentId)
      .map((node) => node.id),
    data,
  };
};

import { ColumnItem, InitialState } from '../../types';

export const buildInitialState = <T>(nodes: InitialState) => ({
  path: [],
  root: nodes.map((node) => node.id),
  data: nodes.reduce((acc: Record<string, ColumnItem<T>>, item) => {
    acc[item.id] = {
      ...item,
      data: item as T,
    };
  }),
});

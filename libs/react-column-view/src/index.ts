import { useCallback, useMemo, useReducer } from 'react';
import { createReducer } from './redux';
import { InitialState } from './types';
import { createItemsProps } from './utils/createItemsProps';

const INITIAL_STATE = {
  path: [],
  root: [],
  data: {},
};

export type Param = {
  path?: string[];
  initialState?: InitialState;
};

export const useColumnView = <T extends Record<string, unknown>>(
  options?: Param
) => {
  const stateReducer = useMemo(() => createReducer<T>(), []);

  const [{ root, data, path }, dispatch] = useReducer(
    stateReducer,
    INITIAL_STATE
  );

  const selectNode = useCallback(
    (id: string) => {
      const node = data[id];

      if (!node) {
        return;
      }

      dispatch({ type: 'select', item: node });
    },
    [data, dispatch]
  );

  const insert = useCallback(
    (item: T, parentId?: string) =>
      dispatch({
        type: 'insert',
        item,
        parentId,
      }),
    [dispatch]
  );

  const push = useCallback(
    (item: string, section: number) =>
      dispatch({ type: 'push', item, section }),
    [dispatch]
  );

  return {
    root: createItemsProps<T>(root, { push, path, data }),
    path: createItemsProps<T>(path, { push, path, data }),
    insert,
    selectNode,
    data,
  };
};

import { useCallback, useMemo, useReducer } from 'react';
import { createMainSlice } from '../redux';
import { InitialState } from '../types';
import { buildInitialState } from '../utils/buildInitialState';
import { buildSection } from '../utils/buildSection';

type Param = {
  path?: string[];
  initialState?: InitialState;
  initialSelectedItemId?: string;
};

export const useColumnView = <T extends Record<string, unknown>>(
  options?: Param
) => {
  const { reducer: stateReducer, actions } = useMemo(
    () => createMainSlice<T>(),
    []
  );

  const [{ root, nodes, path }, dispatch] = useReducer(
    stateReducer,
    options?.initialState ?? [],
    buildInitialState
  );

  const select = useCallback(
    (itemId: string) => dispatch(actions.select({ itemId })),
    [dispatch]
  );

  const insert = useCallback(
    (item: T, parentId?: string) =>
      dispatch(actions.insertItem({ item, parentId })),
    [dispatch]
  );

  const push = useCallback(
    (itemId: string, section: number) =>
      dispatch(actions.push({ itemId, section })),
    [dispatch]
  );

  return [
    {
      nodes,
      insert,
      path: buildSection<T>(path, { root, push, path, nodes }),
      root: buildSection<T>(root, { root, push, path, nodes }),
      select,
    },
    dispatch,
  ] as const;
};

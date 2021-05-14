/**
 * React Column View
 * Riccardo Caranfil
 *
 * Created by Riccardo Caranfil on 05/05/21
 */

import { useCallback, useReducer } from "react";

import { createReducer } from "../core/reducer";
import { buildOptions, createItemsProps } from "../utils";
import { State, UseColumnViewHookOptions, UseColumnViewHookResult } from "../types";

const INITIAL_STATE: State<any> = {
    path: [],
    root: [],
    data: {}
};

export const useColumnView = <T,>(
    options?: UseColumnViewHookOptions<T>
): UseColumnViewHookResult<T> => {
    const stateReducer = createReducer<T>();

    const [{ root, data, path }, dispatch] = useReducer(
        stateReducer,
        buildOptions(options) || INITIAL_STATE
    );

    const insert = useCallback(
        (item: T, parentId?: string) =>
            dispatch({
                type: "insert",
                item,
                parentId
            }),
        [dispatch]
    );

    const push = useCallback(
        (item: string, section: number) => dispatch({ type: "push", item, section }),
        [dispatch]
    );

    const pop = useCallback((item: string) => dispatch({ type: "pop", item }), [dispatch]);

    const navigate = useCallback((item: string) => dispatch({ type: "restore", item }), [data]);

    return {
        root: createItemsProps<T>(root, { push, pop, path, data }),
        path: createItemsProps<T>(path, { push, pop, path, data }),
        insert,
        navigate
    };
};

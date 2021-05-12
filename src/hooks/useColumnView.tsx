/**
 * React Column View
 * Riccardo Caranfil
 *
 * Created by Riccardo Caranfil on 05/05/21
 */

import { useCallback, useReducer } from "react";

import stateReducer from "../core/reducer";
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
    const [{ root, data, path }, dispatch] = useReducer(
        stateReducer,
        buildOptions(options) || INITIAL_STATE
    );

    const insert = useCallback(
        (item: T, parentId?: string) =>
            dispatch({
                type: "insert",
                //@ts-ignore
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

    return {
        // @ts-ignore
        root: createItemsProps(root, data, push),
        // @ts-ignore
        path: createItemsProps(path, data, push),
        insert,
        push,
        pop
    };
};

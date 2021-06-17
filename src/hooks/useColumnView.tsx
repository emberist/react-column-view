/**
 * React Column View
 * Riccardo Caranfil
 *
 * Created by Riccardo Caranfil on 05/05/21
 */

import { useCallback, useEffect } from "react";
import { buildOptions, createItemsProps } from "../utils";
import { State, UseColumnViewHookOptions, UseColumnViewHookResult } from "../types";
import { useDispatch, useSelector } from "react-redux";

export const useColumnView = <T,>(
    options?: UseColumnViewHookOptions<T>
): UseColumnViewHookResult<T> => {
    const dispatch = useDispatch();
    const { root, data, path } = useSelector<any, State<T>>(s => s.column as State<T>);

    useEffect(() => {
        if (options?.initialValues) {
            const state = buildOptions(options);
            dispatch({ type: "init", state });
        }
    }, []);

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

    const navigate = useCallback((item: string) => dispatch({ type: "restore", item }), [dispatch]);

    return {
        root: createItemsProps<T>(root, { push, pop, path, data }),
        path: createItemsProps<T>(path, { push, pop, path, data }),
        insert,
        navigate
    };
};

/**
 * React Column View
 * Riccardo Caranfil
 *
 * Created by Riccardo Caranfil on 05/05/21
 */

import { useCallback, useReducer } from "react";
import { State, UseColumnViewHookOptions, UseColumnViewHookResult } from "react-column-view";
import { compact } from "lodash";
import stateReducer from "../reducer";
import { buildOptions } from "../utils";

const INITIAL_STATE: State<any> = {
    path: [],
};

export function useColumnView<T>(
    options?: UseColumnViewHookOptions<T>
): UseColumnViewHookResult<T> {
    const [{ root, data, path }, dispatch] = useReducer(
        stateReducer,
        buildOptions(options) || INITIAL_STATE
    );

    const getChildren = useCallback(
        (id: string) => {
            return compact(data?.[id]?.children?.map((id) => data?.[id]));
        },
        [data]
    );

    const getItem = useCallback(
        (id: string) => {
            return data?.[id]?.data;
        },
        [data]
    );

    const insert = useCallback(
        (item: T, parentId?: string) =>
            dispatch({
                type: "insert",
                //@ts-ignore
                item,
                parentId,
            }),
        [dispatch]
    );

    const push = useCallback(
        (item: string, section: number) => dispatch({ type: "push", item, section }),
        [dispatch]
    );
    const pop = useCallback((item: string) => dispatch({ type: "pop", item }), [dispatch]);

    // @ts-ignore
    return { root, path, insert, push, pop, getItem, getChildren };
}

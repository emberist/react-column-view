/**
 * React Column View
 * Riccardo Caranfil
 *
 * Created by Riccardo Caranfil on 05/05/21
 */

import { useCallback, useReducer } from "react";
import { State, UseColumnViewHookProps, UseColumnViewHookResult } from "react-column-view";
import { compact } from "lodash";
import stateReducer from "../utils/stateReducer";

const INITIAL_STATE: State<any> = {
    path: [],
};

function useColumnView<T>(props?: UseColumnViewHookProps<T>): UseColumnViewHookResult<T> {
    const [{ root, data, path }, dispatch] = useReducer(
        stateReducer,
        props?.initialState || INITIAL_STATE
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

    //@ts-ignore
    return { root, path, insert, push, pop, getItem, getChildren };
}

export default useColumnView;

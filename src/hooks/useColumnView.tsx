/**
 * React Column View
 * Riccardo Caranfil
 *
 * Created by Riccardo Caranfil on 05/05/21
 */
// import { useReducer } from "react";
// import stateReducer from "../utils/stateReducer";
import { State } from "react-column-view";
import { useReducer } from "react";
import stateReducer from "../utils/stateReducer";

const INITIAL_STATE: State<any> = {
    path: [],
};

type UseColumnViewProps<T> = {
    initialState?: State<T>;
};

function useColumnView<T>(props?: UseColumnViewProps<T>) {
    const [{ root, data, path }, dispatch] = useReducer(
        stateReducer,
        props?.initialState || INITIAL_STATE
    );

    const getChildren = (id: string) => {
        return data?.[id]?.children?.map((id) => data?.[id]);
    };

    //@ts-ignore
    const insert = (item: T, parentId?: string) => dispatch({ type: "insert", item, parentId });
    const push = (item: string, section: number) => dispatch({ type: "push", item, section });
    const pop = (item: string) => dispatch({ type: "pop", item });

    return { root, path, data, insert, push, pop, getChildren };
}

export default useColumnView;

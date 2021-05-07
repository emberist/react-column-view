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

function useColumnView<T extends { id: string }>(props?: UseColumnViewProps<T>) {
    const [{ path, data }, dispatch] = useReducer(
        stateReducer,
        props?.initialState || INITIAL_STATE
    );

    const insert = (item: T) => dispatch({ type: "insert", item });
    // const setOn = () => dispatch({type: 'ON'})
    // const setOff = () => dispatch({type: 'OFF'})

    return { path, data, insert };
}

export default useColumnView;

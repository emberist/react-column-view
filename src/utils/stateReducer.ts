import { State, Action } from "react-column-view";

function reducer<T extends { id: string }>(state: State<T>, action: Action<T>): State<T> {
    switch (action.type) {
        case "insert":
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.item.id]: action.item,
                },
            };
        default:
            return state;
    }
}

export default reducer;

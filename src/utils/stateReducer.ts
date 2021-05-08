import { Action, State } from "react-column-view";

function reducer<T extends { id: string }>(state: State<T>, action: Action<T>): State<T> {
    switch (action.type) {
        case "insert":
            const data = {
                ...state.data,
                [action.item.id]: {
                    children: [],
                    id: action.item.id,
                    parentId: action.parentId,
                    data: action.item,
                },
            };
            return {
                ...state,
                root: Object.values(data || {})
                    ?.filter((i) => !i.parentId)
                    .map((i) => i.id),
                data,
            };
        case "push":
            return {
                ...state,
                path: [...state.path, action.item],
            };
        case "pop":
            state.path.pop();
            return {
                ...state,
                path: [...state.path],
            };
        default:
            return state;
    }
}

export default reducer;

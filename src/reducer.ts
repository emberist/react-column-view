import { Action, State } from "react-column-view";
import { v4 as uuid } from "uuid";
import _ from "lodash";

function reducer<T extends { id: string }>(state: State<T>, action: Action<T>): State<T> {
    switch (action.type) {
        case "insert":
            const id: string = action.item.id || uuid();
            const data = {
                ...state.data,
                [id]: {
                    id,
                    children: [],
                    parentId: action.parentId,
                    data: {
                        ...action.item,
                        id,
                    },
                },
            };
            if (action.parentId) {
                data[action.parentId] = {
                    ...data[action.parentId],
                    children: [...data[action.parentId]?.children, id],
                };
            }
            return {
                ...state,
                root: _(data)
                    .values()
                    .filter((i) => i && !i.parentId)
                    .map((i) => i.id)
                    .valueOf(),
                data,
            };
        case "push":
            let p = state.path;
            if (action.section !== undefined && p[action.section]) {
                p.splice(action.section, 1, action.item);
                p.splice(action.section + 1, p.length - action.section);
            } else {
                p.push(action.item);
            }
            return {
                ...state,
                path: [...p],
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

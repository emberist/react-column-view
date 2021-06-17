import { v4 as uuid } from "uuid";
import _ from "lodash";
import { Action, State } from "../types";
import { buildPath } from "../utils";

export const INITIAL_STATE: State<any> = {
    path: [],
    root: [],
    data: {}
};

export const createReducer = <T = unknown>() => {
    return (state: State<T> = INITIAL_STATE, action: Action<T>) => {
        switch (action.type) {
            case "init":
                return {
                    ...state,
                    ...action.state
                };
            case "insert":
                const id: string = uuid();

                const data = {
                    ...state?.data,
                    [id]: {
                        id,
                        children: [],
                        parentId: action.parentId,
                        data: {
                            ...action.item,
                            id
                        }
                    }
                };

                if (action.parentId) {
                    data[action.parentId] = {
                        ...data[action.parentId],
                        children: [...data[action.parentId]?.children, id]
                    };
                }
                return {
                    ...state,
                    root: _(data)
                        .values()
                        .filter(i => i && !i.parentId)
                        .map(i => i.id)
                        .valueOf(),
                    data
                };
            case "push":
                let currentPath = state?.path || [];
                if (action.section !== undefined && currentPath[action.section]) {
                    currentPath.splice(action.section, 1, action.item);
                    currentPath.splice(action.section + 1, currentPath.length - action.section);
                } else {
                    currentPath.push(action.item);
                }

                return {
                    ...state,
                    path: [...currentPath]
                };
            case "pop":
                state?.path.pop();
                return {
                    ...state,
                    path: [...(state?.path || [])]
                };
            case "restore":
                const path = buildPath(action.item, state?.data || {});
                return {
                    ...state,
                    path
                };
            default:
                return state;
        }
    };
};

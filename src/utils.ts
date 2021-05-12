import { State, UseColumnViewHookOptions } from "react-column-view";

export const buildOptions = <T>(options?: UseColumnViewHookOptions<T>): State<T> | undefined => {
    if (!options) {
        return undefined;
    }

    let data = {};

    // options.initialValues?.forEach((item) => {
    //     const id = uuid();
    //     data[item] = {
    //         id,
    //         children: [],
    //         parentId: action.parentId,
    //         data: _.omit(action.item, "id") as T
    //     };
    // });

    return {
        path: options.path || [],
        root: [],
        data,
    };
};

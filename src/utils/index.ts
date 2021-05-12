import {
    ColumnItem,
    CreateItemsPropsResult,
    State,
    UseColumnViewHookOptions,
    WrappedItem,
} from "react-column-view";

const getItem = <T>(id: string, data: Record<string, ColumnItem<T>>): T | undefined =>
    data?.[id]?.data;

const getChildren = <T>(
    id: string,
    data: Record<string, ColumnItem<T>>,
    push: any
): CreateItemsPropsResult<T> => createItemsProps<T>(data?.[id]?.children || [], data, push);

export const createItemProps = <T>(
    id: string,
    data: Record<string, ColumnItem<T>>,
    push: any
): WrappedItem<T> => {
    return {
        data: () => getItem(id, data),
        children: () => getChildren(id, data, push),
        pushAt: (atSection: number) => push(id, atSection),
        buildProps: (additional?: object) => ({
            ...additional,
            key: id,
        }),
    };
};

export const createItemsProps = <T>(
    ids: string[],
    data: Record<string, ColumnItem<T>>,
    push: any
): CreateItemsPropsResult<T> => {
    return {
        length: ids.length,
        includes: ids.includes,
        map: (callbackfn) =>
            ids.map((id, index) => callbackfn(createItemProps(id, data, push), index, ids)),
        forEach: (callbackfn) =>
            ids.forEach((id, index) => callbackfn(createItemProps(id, data, push), index, ids)),
    };
};

export const buildOptions = <T>(options?: UseColumnViewHookOptions<T>): State<T> | undefined => {
    if (!options) {
        return undefined;
    }

    let data = {};

    // TODO
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

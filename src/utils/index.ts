import {
    ColumnItem,
    CreateItemsPropsResult,
    State,
    UseColumnViewHookOptions,
    WrappedItem
} from "../types";

const getItem = <T>(id: string, data: Record<string, ColumnItem<T>>): T | undefined =>
    data?.[id]?.data;

const getChildren = <T>(id: string, context: ViewContext<T>): CreateItemsPropsResult<T> =>
    createItemsProps<T>(context.data?.[id]?.children || [], context);

type ViewContext<T> = { path: string[]; push: any; data: Record<string, ColumnItem<T>> };

export const createItemProps = <T>(id: string, context: ViewContext<T>): WrappedItem<T> => {
    const { data, push, path } = context;
    const item = getItem(id, data);

    Object.assign(item, {
        //data: () => item,
        isSelected: path.includes(id),
        children: () => getChildren(id, context),
        pushAt: (atSection: number) => push(id, atSection),
        buildProps: (additional?: object) => ({
            ...additional,
            key: id
        })
    });

    return item as WrappedItem<T>;
    // return {
    //     //data: () => item,
    //     isSelected: path.includes(id),
    //     children: () => getChildren(id, context),
    //     pushAt: (atSection: number) => push(id, atSection),
    //     buildProps: (additional?: object) => ({
    //         ...additional,
    //         key: id
    //     })
    // };
};

export const createItemsProps = <T>(
    ids: string[],
    context: ViewContext<T>
): CreateItemsPropsResult<T> => {
    return {
        original: ids,
        length: ids.length,
        includes: ids.includes,
        map: callbackFn =>
            ids.map((id, index) => callbackFn(createItemProps(id, context), index, ids)),
        forEach: callbackFn =>
            ids.forEach((id, index) => callbackFn(createItemProps(id, context), index, ids))
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
        data
    };
};

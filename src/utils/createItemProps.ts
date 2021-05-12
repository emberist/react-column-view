import { ColumnItem, CreateItemsPropsResult, WrappedItem } from "react-column-view";

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

const createItemsProps = <T>(
    ids: string[],
    data: Record<string, ColumnItem<T>>,
    push: any
): CreateItemsPropsResult<T> => {
    return {
        length: ids.length,
        includes: ids.includes,
        map: (callback) =>
            ids.map((id, index) => callback(createItemProps(id, data, push), index, ids)),
        forEach: (callback) =>
            ids.forEach((id, index) => callback(createItemProps(id, data, push), index, ids)),
    };
};

export default createItemsProps;

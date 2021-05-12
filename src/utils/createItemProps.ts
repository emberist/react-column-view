import { ColumnItem, CreateItemsPropsResult, WrappedItem } from "react-column-view";
import { compact } from "lodash";

const getItem = <T>(id: string, data: Record<string, ColumnItem<T>>): T | undefined =>
    data?.[id]?.data;
const getItems = <T>(ids: string[], data: Record<string, ColumnItem<T>>): T[] =>
    compact(ids.map((id) => getItem(id, data)));
const getChildren = <T>(id: string, data: Record<string, ColumnItem<T>>): T[] =>
    getItems(data?.[id]?.children || [], data);

export const createItemProps = <T>(
    id: string,
    data: Record<string, ColumnItem<T>>
): WrappedItem<T> => {
    return {
        data: () => getItem(id, data),
        children: () => getChildren(id, data),
    };
};

const createItemsProps = <T>(
    ids: string[],
    data: Record<string, ColumnItem<T>>
): CreateItemsPropsResult<T> => {
    return {
        map: (callback) => ids.map((id, index) => callback(createItemProps(id, data), index, ids)),
        forEach: (callback) =>
            ids.forEach((id, index) => callback(createItemProps(id, data), index, ids)),
        includes: ids.includes,
        length: ids.length,
    };
};

export default createItemsProps;

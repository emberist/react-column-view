import { v4 as uuid } from "uuid";

import {
    ColumnItem,
    CreateItemsPropsResult,
    State,
    UseColumnViewHookOptions,
    WrappedItem
} from "../types";
import { DEFAULT_CHILDREN_ACCESSOR, DEFAULT_PARENT_ACCESSOR } from "./config";

const getItem = <T>(id: string, data: Record<string, ColumnItem<T>>): T | undefined =>
    data?.[id]?.data;

const getChildren = <T>(id: string, context: ViewContext<T>): CreateItemsPropsResult<T> =>
    createItemsProps<T>(context.data?.[id]?.children || [], context);

type ViewContext<T> = {
    pop: any;
    push: any;
    path: string[];
    data: Record<string, ColumnItem<T>>;
};

export const buildPath = <T>(
    itemId: string,
    data: Record<string, ColumnItem<T>>,
    path?: string[]
): string[] => {
    const { parentId } = data[itemId] || { parentId: undefined };

    if (parentId) {
        return buildPath(parentId, data, [itemId, ...(path || [])]);
    }

    return [itemId, ...(path || [])];
};

export const createItemProps = <T>(id: string, context: ViewContext<T>): WrappedItem<T> => {
    const { data, push, path } = context;
    const item = getItem(id, data);

    Object.assign(item, {
        isSelected: path.includes(id),
        children: () => getChildren(id, context),
        pushAt: (section: number) => push(id, section),
        buildProps: (additional?: object) => ({
            ...additional,
            key: id
        })
    });

    return item as WrappedItem<T>;
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

    const wrapped = options.initialValues?.map((item: any) => {
        const internalId = uuid();
        return {
            ...item,
            id: item.id,
            parent: item[options.parentAccessor || DEFAULT_PARENT_ACCESSOR],
            children: item[options.childrenAccessor || DEFAULT_CHILDREN_ACCESSOR],
            internalId
        };
    });

    const finalData = wrapped?.map((item: any) => {
        return {
            id: item.internalId,
            children: item.children?.map((id: any) => wrapped.find(i => i.id === id).internalId),
            parentId: wrapped.find(i => i.id === item.parent)?.internalId,
            data: item
        };
    });

    return {
        path: options.path || [],
        root: finalData?.filter(i => !i.parentId)?.map(i => i.id) || [],
        data: finalData?.reduce((result: any, item) => {
            result[item.id] = item;
            return result;
        }, {})
    };
};

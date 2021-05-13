export type State<T> = {
    path: string[];
    root: string[];
    data: Record<string, ColumnItem<T>>;
};

export type Action<T> =
    | { type: "insert"; item: T; parentId?: string }
    | { type: "push" | "pop"; item: string; section?: number };

export type ColumnItem<T> = {
    id: string;
    parentId?: string;
    children: string[];
    data: T;
};

export type UseColumnViewHookOptions<T> = {
    path?: string[];
    fetchData?: Function;
    initialValues?: T[];
};

export interface UseColumnViewHookResult<T> {
    root: CreateItemsPropsResult<T>;
    path: CreateItemsPropsResult<T>;
    insert: (item: T, parentId?: string) => void;
}

export type MapCallback<T> = (
    item: WrappedItem<T>,
    index: number,
    original: string[]
) => any | void;

export type CreateItemsPropsResult<T> = {
    map: (callback: MapCallback<T>) => CreateItemsPropsResult<T>[];
    forEach: (callback: MapCallback<T>) => void;
    includes: (item: any) => boolean;
    length: number;
};

export type WrappedItem<T> = {
    isSelected?: boolean;
    data: () => T | undefined;
    pushAt: (section: number) => void;
    children: () => CreateItemsPropsResult<T>;
    buildProps: (additional?: object) => { key: string };
};

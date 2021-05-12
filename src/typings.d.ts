/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */

declare module "react-column-view" {
    export const useColumnView: <T>(
        options?: UseColumnViewHookOptions<T> | undefined
    ) => UseColumnViewHookResult<T>;

    export type State<T> = {
        path: string[];
        root: string[];
        data: Record<string, ColumnItem<T>>;
    };

    export type ColumnItem<T> = {
        id: string;
        parentId?: string;
        children: string[];
        data: T;
    };

    type Action<T> =
        | { type: "insert"; item: T; parentId?: string }
        | { type: "push" | "pop"; item: string; section?: number };

    export type UseColumnViewHookOptions<T> = {
        path?: string[];
        fetchData?: Function;
        initialValues?: T[];
    };

    export interface UseColumnViewHookResult<T> {
        root: CreateItemsPropsResult<T>;
        path: CreateItemsPropsResult<T>;
        insert: (item: T, parentId?: string) => void;
        push: (itemId: string, sectionIndex: number) => void;
        pop: (itemId: string) => void;
    }

    export type Callback = <T>(
        item: WrappedItem<T>,
        index: number,
        original: string[]
    ) => any | void;

    export type CreateItemsPropsResult<T> = {
        map: <T>(callback: Callback<T>) => CreateItemsPropsResult<T>[];
        forEach: <T>(callback: Callback<T>) => void;
        includes: (item: any) => boolean;
        length: number;
    };

    export type WrappedItem<T> = {
        data: () => T | undefined;
        children: () => CreateItemsPropsResult<T>;
        pushAt: (atSection: number) => void;
        buildProps: (additional?: object) => { key: string };
    };
}

import { CreateItemsPropsResult } from '../utils/createItemsProps';

export type State<Data extends Record<string, unknown>> = {
  path: string[];
  root: string[];
  data: Record<string, ColumnItem<Data>>;
};

export type InitialState = {
  id: string;
  children: string[];
}[];

export type Action<Data extends Record<string, unknown>> =
  | { type: 'insert'; item: Data; parentId?: string }
  | { type: 'push' | 'pop'; item: string; section?: number }
  | { type: 'select'; item: ColumnItem<Data> };

export type ColumnItem<Data extends Record<string, unknown>> = {
  id: string;
  parentId?: string;
  children: string[];
  data: Data;
};

export type Callback<Data extends Record<string, unknown>, U> = (
  item: WrappedItem<Data>,
  index: number,
  original: string[]
) => U;

export type ViewContext<Data extends Record<string, unknown>> = {
  path: string[];
  push: (itemId: string, section: number) => void;
  data: Record<string, ColumnItem<Data>>;
};

export type WrappedItem<TInstance extends Record<string, unknown>> =
  TInstance & {
    isSelected?: boolean;
    pushAt: (section: number) => void;
    children: () => CreateItemsPropsResult<TInstance>;
  };

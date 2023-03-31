export type InitialState = (Record<string, unknown> & {
  id: string;
  children: string[];
})[];

export type State<Data extends Record<string, unknown>> = {
  path: string[];
  root: string[];
  nodes: Record<string, Item<Data>>;
};

export type Action<Data extends Record<string, unknown>> =
  | { type: 'insert'; item: Data; parentId?: string }
  | { type: 'push' | 'pop'; item: string; section?: number }
  | { type: 'select'; item: Item<Data> };

export type Item<Data extends Record<string, unknown>> = {
  id: string;
  parentId?: string;
  children: string[];
  original: Data;
};

export type ViewContext<Data extends Record<string, unknown>> = State<Data> & {
  push: (itemId: string, section: number) => void;
};

export type WrappedItem<Data extends Record<string, unknown>> = Omit<
  Item<Data>,
  'children'
> & {
  isSelected?: boolean;
  pushAt: (sectionIndex: number) => void;
  children: WrappedItem<Data>[];
};

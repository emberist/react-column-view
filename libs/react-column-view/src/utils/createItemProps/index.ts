import invariant from 'invariant';
import { ColumnItem, ViewContext, WrappedItem } from '../../types';
import { createItemsProps } from '../createItemsProps';

const getItem = <Data extends Record<string, unknown>>(
  id: string,
  items: Record<string, ColumnItem<Data>>
): Data | null => items?.[id]?.data ?? null;

const getChildren = <Data extends Record<string, unknown>>(
  id: string,
  context: ViewContext<Data>
) => createItemsProps<Data>(context.data?.[id]?.children || [], context);

export const createItemProps = <Data extends Record<string, unknown>>(
  id: string,
  context: ViewContext<Data>
): WrappedItem<Data> => {
  const { data, push, path } = context;
  const item = getItem(id, data);

  invariant(item, `Item with id ${id} not found`);

  return {
    ...item,
    id,
    data: () => item,
    isSelected: path.includes(id),
    children: () => getChildren(id, context),
    pushAt: (atSection: number) => push(id, atSection),
  };
};

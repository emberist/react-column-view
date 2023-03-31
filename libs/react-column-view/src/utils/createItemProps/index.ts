import invariant from 'invariant';
import { Item, ViewContext, WrappedItem } from '../../types';
import { buildSection } from '../buildSection';

const getItemData = <Data extends Record<string, unknown>>(
  id: string,
  items: Record<string, Item<Data>>
): Data | null => items?.[id]?.original ?? null;

const getChildren = <Data extends Record<string, unknown>>(
  id: string,
  context: ViewContext<Data>
) => buildSection(context.nodes?.[id]?.children || [], context);

export const createItemProps = <Data extends Record<string, unknown>>(
  id: string,
  _: number,
  context: ViewContext<Data>
): WrappedItem<Data> => {
  const { nodes, push, path } = context;

  const item = getItemData(id, nodes);

  invariant(item, `Item with id ${id} not found`);

  return {
    children: getChildren(id, context),
    id,
    isSelected: path.includes(id),
    original: item,
    pushAt: (sectionIndex) => {
      push(id, sectionIndex);
    },
  };
};

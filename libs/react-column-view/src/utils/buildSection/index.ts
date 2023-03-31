import { ViewContext } from '../../types';
import { createItemProps } from '../createItemProps';

export const buildSection = <Data extends Record<string, unknown>>(
  ids: string[],
  context: ViewContext<Data>
) => ids.map((id, sectionindex) => createItemProps(id, sectionindex, context));

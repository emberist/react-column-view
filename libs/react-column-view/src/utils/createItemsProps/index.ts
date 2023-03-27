import { Callback, ViewContext } from '../../types';
import { createItemProps } from '../createItemProps';

export type CreateItemsPropsResult<Data extends Record<string, unknown>> = {
  original: string[];
  length: number;
  forEach: (callback: Callback<Data, void>) => void;
  map: <U>(callback: Callback<Data, U>) => U[];
};

export const createItemsProps = <Data extends Record<string, unknown>>(
  ids: string[],
  context: ViewContext<Data>
): CreateItemsPropsResult<Data> => {
  return {
    original: ids,
    length: ids.length,
    map: (callbackFn) =>
      ids.map((id, index) =>
        callbackFn(createItemProps(id, context), index, ids)
      ),
    forEach: (callbackFn) =>
      ids.forEach((id, index) =>
        callbackFn(createItemProps(id, context), index, ids)
      ),
  };
};

import { values } from 'lodash';
import { Reducer } from 'react';
import { v4 as uuid } from 'uuid';
import { Action, State } from '../types';

type ColumnViewReducer<Data extends Record<string, unknown>> = Reducer<
  State<Data>,
  Action<Data>
>;

export const createReducer = <
  T extends Record<string, unknown>
>(): ColumnViewReducer<T> => {
  return function reducer(state, action) {
    switch (action.type) {
      case 'insert': {
        const id = uuid();

        const data = {
          ...state.data,
          [id]: {
            id,
            children: [],
            parentId: action.parentId,
            data: {
              ...action.item,
              id,
            },
          },
        };

        if (action.parentId) {
          data[action.parentId] = {
            ...data[action.parentId],
            children: [...(data[action.parentId]?.children || []), id],
          };
        }

        return {
          ...state,
          root: values(data)
            .filter((i) => i && !i.parentId)
            .map((i) => i.id),
          data,
        };
      }
      case 'push': {
        const currentPath = state.path;

        if (action.section !== undefined && currentPath[action.section]) {
          currentPath.splice(action.section, 1, action.item);
          currentPath.splice(
            action.section + 1,
            currentPath.length - action.section
          );
        } else {
          currentPath.push(action.item);
        }

        return {
          ...state,
          path: [...currentPath],
        };
      }
      case 'select': {
        const newPath = [action.item.id];

        if (action.item.parentId) {
          let parentId = action.item.parentId;

          while (parentId !== '') {
            const node = state.data[parentId];
            newPath.push(node.id);
            parentId = node.parentId || '';
          }
        }

        console.log({ newPath });

        return {
          ...state,
          path: newPath.reverse(),
        };
      }
      case 'pop':
        state.path.pop();

        return {
          ...state,
          path: [...state.path],
        };
      default:
        return state;
    }
  };
};

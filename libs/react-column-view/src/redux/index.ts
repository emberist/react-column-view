import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { values } from 'lodash';
import { v4 as uuid } from 'uuid';
import type { State } from '../types';

export const createMainSlice = <T extends Record<string, unknown>>() => {
  const initialState: State<T> = {
    root: [],
    path: [],
    nodes: {},
  };

  return createSlice({
    name: 'main',
    initialState,
    reducers: {
      insertItem: (
        state,
        action: PayloadAction<{ item: T; parentId?: string }>
      ) => {
        const id = uuid();

        const { item, parentId } = action.payload;

        state.nodes[id] = {
          id,
          parentId,
          children: [],
          original: { ...item, id } as unknown as Draft<T>,
        };

        if (parentId) {
          state.nodes[parentId].children.push(id);
        }

        state.root = values(state.nodes)
          .filter((i) => i && !i.parentId)
          .map((i) => i.id);
      },
      push: (
        state,
        action: PayloadAction<{ section: number; itemId: string }>
      ) => {
        const { section, itemId } = action.payload;

        const currentPath = state.path;

        if (section !== undefined && currentPath[section]) {
          currentPath.splice(section, 1, itemId);
          currentPath.splice(section + 1, currentPath.length - section);
        } else {
          currentPath.push(itemId);
        }

        state.path = currentPath;
      },
      select: (state, action: PayloadAction<{ itemId: string }>) => {
        const { itemId } = action.payload;

        const item = state.nodes[itemId];

        const newPath = [item.id];

        if (item.parentId) {
          let parentId = item.parentId;

          while (parentId !== '') {
            const node = state.nodes[parentId];

            newPath.push(node.id);
            parentId = node.parentId || '';
          }
        }

        state.path = newPath.reverse();
      },
    },
  });
};

import { IItem } from '@/types/item';
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { persist } from 'zustand/middleware';

interface ItemsState {
  items: IItem[];
  groups: string[];
  isEditing: boolean;
  addItem: (item: Omit<IItem, 'id' | 'checked'>) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
  toggleItemSelection: (id: string) => void;
  selectAll: () => void;
  clearSelection: () => void;
  setEditing: (editing: boolean) => void;
}

const useItemsStore = create<ItemsState>()(
  persist(
    (set) => ({
      items: [] as IItem[],
      groups: [] as string[],
      isEditing: false,
      addItem: (item: Omit<IItem, 'id' | 'checked'>) =>
        set((state) => {
          const updatedItems = [
            ...state.items,
            { ...item, checked: false, id: uuidv4() },
          ];
          const updatedGroups = Array.from(
            new Set([...state.groups, item.group])
          );
          return { items: updatedItems, groups: updatedGroups };
        }),
      removeItem: (id: string) =>
        set((state) => {
          const itemToRemove = state.items.find((item) => item.id === id);
          if (!itemToRemove) return state;

          const updatedItems = state.items.filter((item) => item.id !== id);
          const isGroupEmpty = !updatedItems.some(
            (item) => item.group === itemToRemove.group
          );
          const updatedGroups = isGroupEmpty
            ? state.groups.filter((group) => group !== itemToRemove.group)
            : state.groups;
          return { items: updatedItems, groups: updatedGroups };
        }),
      clearItems: () => set({ items: [], groups: [] }),
      toggleItemSelection: (id: string) =>
        set((state) => ({
          items: state.items.map((item: IItem) =>
            item.id === id ? { ...item, checked: !item.checked } : item
          ),
        })),
      selectAll: () =>
        set((state) => ({
          items: state.items.map((item: IItem) => ({ ...item, checked: true })),
        })),
      clearSelection: () =>
        set((state) => ({
          items: state.items.map((item: IItem) => ({
            ...item,
            checked: false,
          })),
        })),
      setEditing: (editing: boolean) => set({ isEditing: editing }),
    }),
    {
      name: 'items-storage',
      partialize: (state) => ({ items: state.items, groups: state.groups }),
    }
  )
);

export default useItemsStore;

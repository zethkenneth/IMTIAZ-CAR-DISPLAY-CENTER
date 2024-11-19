import { create } from "zustand";

const useInventoryStore = create((set) => ({
  inventory: [],
  addItem: (item) =>
    set((state) => ({
      inventory: [...state.inventory, item],
    })),
  updateItemQuantity: (itemId, quantity) =>
    set((state) => ({
      inventory: state.inventory.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    })),
  removeItem: (itemId) =>
    set((state) => ({
      inventory: state.inventory.filter((item) => item.id !== itemId),
    })),
  fetchInventory: (items) => set({ inventory: items }),
}));

export default useInventoryStore;

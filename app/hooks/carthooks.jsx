import {create} from 'zustand';

const useCartStore = create((set) => ({
  cart: [],
  addItem: (item) => set((state) => ({
    cart: [...state.cart, item],
  })),
  removeItem: (itemId) => set((state) => ({
    cart: state.cart.filter(item => item.id !== itemId),
  })),
  clearCart: () => set({ cart: [] }),
  totalItems: () => set((state) => state.cart.length),
  totalPrice: () => set((state) => state.cart.reduce((total, item) => total + item.price, 0)),
}));

export default useCartStore;

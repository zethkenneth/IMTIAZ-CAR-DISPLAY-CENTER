import { validateStatusOk, handleFailedStatus } from "@utils/validation";
import { create } from "zustand";
import axios from "axios";

const baseURL = "/api/imtiaz";

function generateOrderCode(length = 10) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let orderCode = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    orderCode += characters[randomIndex];
  }
  return orderCode;
}

const useCartHook = create((set, get) => ({
  cart: {
    code: generateOrderCode(6),
    total_amount: 0,
    products: [],
  },
  addToCart: (product) => {
    if (get().cart.total_amount === 0) {
      return set((state) => ({
        cart: {
          ...state.cart,
          total_amount: parseFloat(product.price),
          products: [{ ...product, quantity: 1 }],
        },
      }));
    }

    const productExist = get().cart.products.filter(
      (value) => value.productID === product.productID
    );

    if (productExist.length > 0) {
      set((state) => ({
        cart: state.cart.products.map((productInCart) => {
          const productExist = productInCart.productID === product.productID;

          /**
           * If exist update the current product quantity
           */
          if (productExist) {
            return {
              ...productInCart,
              quantity: productInCart.quantity + 1,
            };
          }

          /**
           * If product ID doesn't match with product added to cart return product in current
           */
          return productInCart;
        }),
      }));

      return set((state) => ({
        cart: {
          ...state.cart,
          total_amount:
            parseFloat(state.cart.total_amount) + parseFloat(product.price),
        },
      }));
    }

    const newProducts = get().cart.products;
    console.log(newProducts);
    /**
     * If cart is not empty and new product is added
     */
    set((state) => ({
      cart: {
        total_amount:
          parseFloat(state.cart.total_amount) + parseFloat(product.price),
        products: [...state.cart.products, { ...product, quantity: 1 }],
      },
    }));
  },
}));

export default useCartHook;

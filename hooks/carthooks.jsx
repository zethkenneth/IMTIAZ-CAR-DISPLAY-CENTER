import { validateStatusOk, handleFailedStatus } from "@utils/validation";
import { create } from "zustand";
import axios from "axios";

const baseURL = "/api/imtiaz";

const formattedDate = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: '2-digit',
  year: 'numeric',
}).format(new Date());


const useCartHook = create((set, get) => ({
  cart: {
    quantity: 0,
    total_amount: 0,
    products: [],
  },
  orders: [],
  addToCart: async (product) => {
    // Check if there's enough stock
    if (product.quantityOnHand <= 0) {
      return { status: 400, message: "Product out of stock" };
    }

    // For existing products in cart, check total quantity
    const existingProduct = get().cart.products.find(p => p.productID === product.productID);
    if (existingProduct) {
      if (existingProduct.quantity + 1 > product.quantityOnHand) {
        return { status: 400, message: "Not enough stock available" };
      }
    }

    if (get().cart.total_amount === 0) {
      return set((state) => ({
        cart: {
          ...state.cart,
          quantity: 1,
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
        cart: {
          ...state.cart,
          products: state.cart.products.map((productInCart) => {
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
            return product;
          }),
        },
      }));

      return set((state) => ({
        cart: {
          ...state.cart,
          quantity: state.cart.quantity + 1,
          total_amount:
            parseFloat(state.cart.total_amount) + parseFloat(product.price),
        },
      }));
    }

    const newProducts = get().cart.products;
    /**
     * If cart is not empty and new product is added
     */
    set((state) => ({
      cart: {
        quantity: state.cart.quantity + 1,
        total_amount:
          parseFloat(state.cart.total_amount) + parseFloat(product.price),
        products: [...state.cart.products, { ...product, quantity: 1 }],
      },
    }));
  },
  resetCart: () => set(() => ({
    cart: {
      quantity: 0,
      total_amount: 0,
      products: [],
    }})),
  placeOrder: async (callback) => {
    try {
      const cartProducts = get().cart.products;
      
      // Validate quantities
      for (const product of cartProducts) {
        if (product.quantity > product.quantityOnHand) {
          callback(400, "Some products no longer have sufficient stock");
          return;
        }
      }

      // Send the original amount without any conversion
      console.log(get().cart.total_amount)
      const result = await axios.post(`${baseURL}/payments`, {
        amount: get().cart.total_amount,
        description: `Payment made on ${formattedDate}`
      });

      console.log(result)

      const paymentDetails = result.data.data.attributes;
      
      // Prepare products data with quantities
      const products = cartProducts.map((value) => ({
        productID: value.productID,
        quantity: value.quantity,
        unitPrice: value.price,
        totalPrice: value.quantity * value.price,
        quantityOnHand: value.quantityOnHand
      }));

      // Place order
      const response = await axios.post(`${baseURL}/orders`, {
        customerId: 1,
        userId: 1,
        paymentCode: paymentDetails.reference_number,
        totalAmount: get().cart.total_amount,
        products: products
      });

      if (response.status === 200) {
        callback(200, "Order placed successfully");
        set(() => ({ 
          cart: {
            quantity: 0,
            total_amount: 0,
            products: []
          }
        }));
      }
    } catch (error) {
      callback(500, error.message);
    }
  },
}));

export default useCartHook;

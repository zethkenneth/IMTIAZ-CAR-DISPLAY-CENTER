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
    discount_percentage: 0,
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
  placeOrder: async (callback, customerId) => {
    try {
      const cartProducts = get().cart.products;
      
      // Validate quantities
      for (const product of cartProducts) {
        if (product.quantity > product.quantityOnHand) {
          callback(400, "Some products no longer have sufficient stock");
          return;
        }
      }

      const result = await axios.post(`${baseURL}/payments`, {
        amount: get().cart.total_amount,
        description: `Payment made on ${formattedDate}`
      });

      const paymentDetails = result.data.data.attributes;
      
      // Prepare products data with quantities
      const products = cartProducts.map((value) => ({
        productID: value.productID,
        quantity: value.quantity,
        unitPrice: value.price,
        totalPrice: value.quantity * value.price,
        quantityOnHand: value.quantityOnHand
      }));

      // Place order with customerId
      const response = await axios.post(`${baseURL}/orders`, {
        customerId: customerId,
        userId: 1,
        paymentCode: paymentDetails.reference_number,
        totalAmount: get().cart.total_amount,
        products: products
      });

      if (response.data.status === 200) {
        callback(200, {
          message: "Order placed successfully",
          orderId: response.data.order.orderID,
          paymentCode: paymentDetails.reference_number
        });
        
        set(() => ({ 
          cart: {
            quantity: 0,
            total_amount: 0,
            products: []
          }
        }));
      } else {
        throw new Error(response.data.message || "Failed to place order");
      }
    } catch (error) {
      callback(500, error.message);
    }
  },
  updateQuantity: (productId, newQuantity) => {
    set((state) => {
      // Ensure products array exists
      const currentProducts = state.cart?.products || [];
      
      // Update products array with new quantity
      const updatedProducts = currentProducts.map(product => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: newQuantity,
            subtotal: product.price * newQuantity
          };
        }
        return product;
      });

      // Calculate new totals
      const totalQuantity = updatedProducts.reduce((sum, product) => sum + (product.quantity || 1), 0);
      const totalAmount = updatedProducts.reduce((sum, product) => sum + (product.price * (product.quantity || 1)), 0);

      // Return updated state
      return {
        cart: {
          ...state.cart,
          products: updatedProducts,
          quantity: totalQuantity,
          total_amount: totalAmount
        }
      };
    });
  },
  removeProduct: (productId) => {
    set((state) => {
      // Ensure products array exists
      const currentProducts = state.cart?.products || [];
      
      // Filter out the removed product
      const updatedProducts = currentProducts.filter(product => product.id !== productId);

      // Calculate new totals
      const totalQuantity = updatedProducts.reduce((sum, product) => sum + (product.quantity || 1), 0);
      const totalAmount = updatedProducts.reduce((sum, product) => sum + (product.price * (product.quantity || 1)), 0);

      // Return updated state
      return {
        cart: {
          ...state.cart,
          products: updatedProducts,
          quantity: totalQuantity,
          total_amount: totalAmount
        }
      };
    });
  },
  setDiscount: (percentage) => {
    set((state) => {
      const subtotal = state.cart.total_amount;
      const discountAmount = (subtotal * percentage) / 100;
      
      return {
        cart: {
          ...state.cart,
          discount_percentage: percentage,
          total_amount: subtotal - discountAmount
        }
      };
    });
  },
}));

export default useCartHook;

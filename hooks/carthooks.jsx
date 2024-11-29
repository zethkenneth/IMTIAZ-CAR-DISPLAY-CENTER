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
  addToCart: (product) => {
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
  placeOrder: async (callBack) => {
    
    const result = await axios.post(`${baseURL}/payments`, {amount: get().cart.total_amount, description: `Payment made on ${formattedDate}`});

    const paymentDetails = result.data.data.attributes;
    
    let products = get().cart.products.map((value) => {
      const product = {
        productID: value.productID,
        quantity: value.quantity,
        unitPrice: value.price,
        totalPrice: value.quantity * value.price,
      };

      return product;
    });

    const body = {
      customerId: 1,
      userId: 1,
      paymentCode: paymentDetails.reference_number,
      totalAmount: get().cart.total_amount,
      products: products
    }

    axios
      .post(`${baseURL}/orders`, body)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { order, orderDetails, message } = res;
        console.log('ORDER:', order);
        console.log('ORDER DETAILS:', orderDetails);


        set((state) => ({ orders: [...state.orders, order] }));

        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
}));

export default useCartHook;

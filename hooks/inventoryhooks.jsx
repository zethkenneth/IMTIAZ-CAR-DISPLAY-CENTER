import { validateStatusOk, handleFailedStatus } from "@utils/validation";
import { create } from "zustand";
import axios from "axios";

const baseURL = "/api/imtiaz";

const useInventorHooks = create((set) => ({
  products: [],
  getInventory: (token, callBack) => {
    axios
      .get(`${baseURL}/products`, token)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { data, message } = res;
        set(() => ({ products: data }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
  getProduct: (token, productID, callBack) => {
    axios
      .get(`${baseURL}/products/${productID}`, token)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { data, message } = res;
        set(() => ({ products: data }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
  storeProduct: (form, callBack) => {
    axios
      .post(`${baseURL}/products`, form)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { newProduct, message } = res;
        set((state) => ({ products: [...state.products, newProduct] }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
  deleteProduct: (token, productID, callBack) => {
    axios
      .delete(`${baseURL}/products/${productID}`, token)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { message } = res;

        set((state) => ({
          products: state.products.filter(
            (product) => product.id !== productID
          ),
        }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
}));

export default useInventorHooks;

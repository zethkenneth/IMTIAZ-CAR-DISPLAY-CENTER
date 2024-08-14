import { validateStatusOk, handleFailedStatus } from "@utils/validation";
import { create } from "zustand";
import axios from "axios";

const baseURL = "/api/imtiaz";

const useOrderHooks = create((set) => ({
  orders: [],
  getOrders: (token, callBack) => {
    axios
      .get(`${baseURL}/orders`, token)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { data, message } = res;
        set(() => ({ orders: data }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
  getProduct: (token, orderID, callBack) => {
    axios
      .get(`/orders/${orderID}`, token)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { data, message } = res;
        set(() => ({ orders: data }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
  storeProduct: (form, callBack) => {
    axios
      .post("/orders", form)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { data, message } = res;
        set(() => ({ orders: data }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
  deleteProduct: (token, orderID, callBack) => {
    axios
      .delete(`/orders/${orderID}`, token)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { data, message } = res;
        set(() => ({ orders: data }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
}));

export default useOrderHooks;

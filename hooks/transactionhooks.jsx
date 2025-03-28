import { validateStatusOk, handleFailedStatus } from "@utils/validation";
import { create } from "zustand";
import axios from "axios";

const useTransactionHooks = create((set) => ({
  transactions: [],
  getTransactions: async (token, callBack) => {
    try {
      const timestamp = new Date().getTime();
      const response = await axios.get(`/api/imtiaz/transactions?t=${timestamp}`, {
        cancelToken: token,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        // Force axios to bypass cache
        params: {
          _: new Date().getTime()
        }
      });
      
      const validatedResponse = validateStatusOk(response);
      const { data, message } = validatedResponse;
      
      set(() => ({ transactions: data }));
      callBack(200, message);
    } catch (err) {
      callBack(...handleFailedStatus(err));
    }
  },
  getProduct: (token, transactionID, callBack) => {
    axios
      .get(`/transaction/${transactionID}`, token)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { data, message } = res;
        set(() => ({ transactions: data }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
  storeProduct: (form, callBack) => {
    axios
      .post("/transaction", form)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { data, message } = res;
        set(() => ({ transactions: data }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
  deleteProduct: (token, transactionID, callBack) => {
    axios
      .delete(`/transaction/${transactionID}`, token)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { data, message } = res;
        set(() => ({ transactions: data }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
}));

export default useTransactionHooks;

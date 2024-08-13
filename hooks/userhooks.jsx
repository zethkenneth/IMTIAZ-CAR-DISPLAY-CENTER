import { validateStatusOk, handleFailedStatus } from "@utils/validation";
import { create } from "zustand";
import axios from "axios";

const useUserHooks = create((set) => ({
  user: [],
  getUser: (token, orderID, callBack) => {
    axios
      .get(`/users/${orderID}`, token)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { data, message } = res;
        set(() => ({ user: data }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
  signIn: (form, callBack) => {
    axios
      .post("/users", form)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { data, message } = res;
        set(() => ({ user: data }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
  storeUser: (form, callBack) => {
    axios
      .post("/users", form)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { data, message } = res;
        set(() => ({ user: data }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
  deleteUser: (token, orderID, callBack) => {
    axios
      .delete(`/users/${orderID}`, token)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { data, message } = res;
        set(() => ({ order: data }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
}));

export default useUserHooks;

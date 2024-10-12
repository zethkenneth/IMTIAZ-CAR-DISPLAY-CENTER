import { validateStatusOk, handleFailedStatus } from "@utils/validation";
import { create } from "zustand";
import axios from "axios";

const baseURL = "/api/imtiaz";

const useUserHooks = create((set) => ({
  user: null,
  users: [],
  signIn: (form, callBack) => {
    axios
      .post(`${baseURL}/login`, { body: form })
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { user, message } = res;
        set(() => ({ user: user }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
  signOut: (callBack) => {
    axios
      .post(`${baseURL}/signout`)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { user, message } = res;
        set(() => ({ user: user }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
  getUser: (token, orderID, callBack) => {
    axios
      .get(`/users/${orderID}`, token)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { data, message } = res;
        set(() => ({ users: data }));
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

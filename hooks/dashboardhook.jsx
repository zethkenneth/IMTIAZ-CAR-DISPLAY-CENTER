import { validateStatusOk, handleFailedStatus } from "@utils/validation";
import { create } from "zustand";
import axios from "axios";

const baseURL = "/api/imtiaz";

const useDashboardHook = create((set) => ({
  analytic: null,
  getAnalytic: (token, callBack) => {
    axios
      .get(`${baseURL}/analytics`, token)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { data, message } = res;
        set(() => ({ analytic: data }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
}));

export default useDashboardHook;

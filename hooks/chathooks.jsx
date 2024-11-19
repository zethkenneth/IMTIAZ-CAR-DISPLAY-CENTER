import axios from "axios";
import { create } from "zustand";

const BASE_URL = "/api";

const useChatHooks = create((set) => ({
  messages: [],
  greetMe: (callBack) => {
    axios
      .post(`${BASE_URL}/chatbot`, { message: "greet me." })
      .then((res) => {
        const { status } = res;

        if (!(status >= 200 && status < 300)) {
          throw new Error("Bad response", { cause: res });
        }

        return res.data;
      })
      .then((res) => {
        const { response } = res;

        set((state) => ({
          messages: [
            ...state.messages,
            { sent_by: "ai", content: response, status: 1 },
          ],
        }));

        callBack(200, "success");
      })
      .catch((err) => {
        callBack(500, err);
      });
  },
  send: (message, clearMessage, callBack) => {
    set((state) => ({
      messages: [
        ...state.messages,
        { sent_by: "user", content: message, status: 1 },
      ],
    }));

    clearMessage();

    axios
      .post(`${BASE_URL}/chatbot`, { message: message })
      .then((res) => {
        const { status } = res;

        if (!(status >= 200 && status < 300)) {
          throw new Error("Bad response", { cause: res });
        }

        return res.data;
      })
      .then((res) => {
        const { response } = res;

        set((state) => ({
          messages: [
            ...state.messages,
            { sent_by: "ai", content: response, status: 1 },
          ],
        }));

        callBack(200, "success");
      })
      .catch((err) => {
        callBack(500, err);
      });
  },
}));

export default useChatHooks;

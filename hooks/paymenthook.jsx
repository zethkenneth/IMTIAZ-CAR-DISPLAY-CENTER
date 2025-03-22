import { handleFailedStatus } from "@utils/validation";
import { create } from "zustand";
import axios from "axios";

const usePaymentHook = create((set, get) => ({
    paymentCode: null,
    paymentDetails: null,
    orderDetails: null,
    checkoutURL: null,
    setPaymentCode: (paymentCode) => set(() => ({paymentCode: paymentCode})),
    setCheckoutURL: (url) => set(() => ({checkoutURL: url})),
    getOrderDetails: (callBack) => {
        axios.get(`/api/imtiaz/orders/information`, {params: {code: get().paymentCode}}).
        then(res => {
            const {status } = res;
            
            if(!(status >= 200 && status < 300)){
                throw new Error("Bad response.", {cause: res});
            }
            
            return res.data;
        }).then((res) => {
            const {orderDetails} = res;

            set(() => ({orderDetails: orderDetails}));

            callBack(200, "Order Details retrieve");
        })
        .catch((err) => callBack(...handleFailedStatus(err)));
    },
    getPaymentDetails: (callBack) => {
        axios.get(`/api/imtiaz/payments`, {params: {code: get().paymentCode}}).then((res) => {
            const {status } = res;
            
            if(!(status >= 200 && status < 300)){
                throw new Error("Bad response.", {cause: res});
            }
            
            return res.data;
        }).then((res) => {
            const attributes = res.data[0].attributes;

            set(() => ({paymentDetails: attributes, checkoutURL: attributes.checkout_url}));

            callBack(200, "Payment Details retrieve");
        })
        .catch((err) => callBack(...handleFailedStatus(err)));
    },
    getPaymentUpdate: (callBack) => {
        axios.get(`/api/imtiaz/checkpayments`, {params: {code: get().paymentCode}})
        .then(res => {
            const {status} = res;
            
            if(!(status >= 200 && status < 300)){
                throw new Error("Bad response.", {cause: res});
            }
            
            return res.data;
        }).then((res) => {
            const {paymentStatus, message} = res;

            set((state) => ({
                paymentDetails: {
                    ...state.paymentDetails, 
                    paymentStatus: paymentStatus
                }
            }));
            
            callBack(200, {
                message,
                paymentStatus
            });
        })
        .catch((err) => callBack(...handleFailedStatus(err)));
    },
}))

export default usePaymentHook;
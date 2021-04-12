import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import Vue from 'vue'
Vue.use(VueToast);
export function openToastMess(message, type) {
    Vue.$toast.open({
        message: message,
        type: type,
        duration: 5000,
        dismissible: true,
        position: "bottom-left",
    });
}

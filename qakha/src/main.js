import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import "bootstrap"
import "jquery"
import "popper.js"
import "bootstrap/dist/css/bootstrap.min.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faPhoneAlt, faCaretLeft, faCaretRight, faCoffee, faAnchor, faArrowUp, faShoppingCart, faEdit, faTrashAlt, faUndo, faClipboardList, faCamera, faStore, faList, faCartPlus, faCoins, faMapMarkerAlt, faClock, faStoreAlt, faMotorcycle } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import formatVND from '@/services/formatVND'
import '@/assets/asset_item/css/bootstrap.css'
import '@/assets/asset_item/css/font-awesome.css'
import '@/assets/asset_item/css/themify-icons.css'
import '@/assets/asset_item/css/jquery.fancybox.min.css'
import '@/assets/asset_item/css/flex-slider.min.css'
import '@/assets/asset_item/css/niceselect.css'
import '@/assets/asset_item/css/animate.css'
import '@/assets/asset_item/css/style.css'
import '@/assets/asset_item/css/slicknav.min.css'
import '@/assets/asset_item/css/responsive.css'
import 'vue-scroll-up/dist/style.css'
import '@/assets/asset_item2/bootstrap/css/bootstrap.min.css/'
import '@/assets/asset_item2/font-awesome/css/font-awesome.min.css/'
import '@/assets/asset_login_item/css/bootstrap.css'
import '@/assets/asset_login_item/css/login-register.css'
import Vuelidate from 'vuelidate'
import * as VueGoogleMaps from "vue2-google-maps";
import ProgressBar from 'vuejs-progress-bar'
import VueGeolocation from 'vue-browser-geolocation';
import i18n from '@/plugins/i18n';
import FlagIcon from 'vue-flag-icon';
import VueCountdown from '@chenfengyuan/vue-countdown';


Vue.use(FlagIcon);
Vue.use(VueGeolocation);
Vue.use(ProgressBar)


// import VueToast from 'vue-toast-notification';
// import 'vue-toast-notification/dist/theme-sugar.css';

// Vue.use(VueToast);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAe1BkXoX8x0LuomskKH7DbC-HKimeioAg",
    libraries: "places"
  }
});


library.add(faEnvelope, faPhoneAlt, faCaretLeft, faCaretRight, faCoffee, faAnchor, faGoogle, faFacebook, faArrowUp, faShoppingCart, faEdit, faTrashAlt, faUndo, faClipboardList, faCamera, faStore, faList, faCartPlus, faCoins, faMapMarkerAlt, faClock, faStoreAlt, faMotorcycle)
Vue.use(Vuelidate)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('vue-countdown', VueCountdown);

Vue.config.productionTip = false

Vue.filter('formatVND', function (value) {
  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

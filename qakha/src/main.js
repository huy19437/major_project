import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap"
import "jquery"
import "popper.js"
import "bootstrap/dist/css/bootstrap.min.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faAnchor } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@/assets/asset_item/css/style.css'
import '@/assets/asset_item/css/bootstrap.css'
import '@/assets/asset_item/css/niceselect.css'
import '@/assets/asset_item/css/animate.css'
import '@/assets/asset_item/css/slicknav.min.css'
import '@/assets/asset_item/css/font-awesome.css'
import '@/assets/asset_item/css/themify-icons.css'
import '@/assets/asset_item/css/responsive.css'
import 'vue-scroll-up/dist/style.css'
// import '@/assets/asset_item/js/scrollup.js'

library.add(faCoffee, faAnchor)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

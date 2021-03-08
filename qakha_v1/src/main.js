// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
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
// import '@/assets/asset_item/js/owl-carousel.js'

library.add(faCoffee, faAnchor)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

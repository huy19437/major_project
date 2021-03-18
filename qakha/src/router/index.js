import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProductDetail from '@/components/product_details/ProductDetail.vue'
import Cart from '@/components/cart/Cart.vue'
import Profile from '@/components/profile/Profile.vue'
import Checkout from '@/components/checkout/Checkout.vue'
import Login from '@/components/login/Login.vue'
import OrderConfirm from '@/components/order_confirmation/OrderConfirm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product-details',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
      auth: true
    },
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: {
      auth: true
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      auth: true
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem("token")){
        next("/");
      }else{
        next();
      }
    }
  },
  {
    path: '/orderconfirm',
    name: 'OrderConfirm',
    component: OrderConfirm,
    meta: {
      auth: true
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    if (localStorage.getItem('token') === null) {
      next({ path: '/login' });
    }
    next();
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem('token') === null) {
      next();
    } else {
      next({ path: '/' });
    }
  } else {
    next();
  }
});

export default router

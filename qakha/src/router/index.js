import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Loginn from '@/components/login/Loginn.vue'
import Forgot from '@/components/login/Forgot.vue'
import ResetPass from '@/components/login/ResetPass.vue'
import ListProducts from '@/components/homepage/content/listProducts/ListProducts.vue'
import ListPartners from "@/components/homepage/content/listPartners/ListPartners"
import ProductDetail from '@/components/product_details/ProductDetail.vue'
import Cart from '@/components/cart/Cart.vue'
import Profile from '@/components/profile/Profile.vue'
import Checkout from '@/components/checkout/Checkout.vue'
import OrderConfirm from '@/components/order_confirmation/OrderConfirm.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/list-partners',
    component: Home,
    children: [
      {
        path: 'list-partners',
        name: 'ListPartners',
        component: ListPartners
      },
      {
        path: 'list-products',
        name: 'ListProducts',
        component: ListProducts
      },
    ],
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
    path: '/orderconfirm',
    name: 'OrderConfirm',
    component: OrderConfirm,
    meta: {
      auth: true
    },
  },
  {
    path: '/login',
    name: 'Loginn',
    component: Loginn,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: Forgot,
  },
  {
    path: '/reset',
    name: 'ResetPass',
    component: ResetPass,
  },
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

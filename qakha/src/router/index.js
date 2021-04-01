import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProductDetail from '@/components/product_details/ProductDetail.vue'
import Cart from '@/components/cart/Cart.vue'
import Profile from '@/components/profile/Profile.vue'
import Checkout from '@/components/checkout/Checkout.vue'
import Login from '@/components/login/Login.vue'
import Loginn from '@/components/login/Loginn.vue'
import Forgot from '@/components/login/Forgot.vue'
import ResetPass from '@/components/login/ResetPass.vue'
import OrderConfirm from '@/components/order_confirmation/OrderConfirm.vue'
import ListProducts from '@/components/homepage/content/listProducts/ListProducts.vue'
import ListPartners from "@/components/homepage/content/listPartners/ListPartners";
import Content from '@/components/homepage/Content'
import MultiContent from '@/components/homepage/multi_content/MultiContent'
import SingleContent from '@/components/homepage/single_content/SingleContent'
import MainContent from '@/components/homepage/content/MainContent'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
       {
        path: '/',
        component: Content,
        children: [
          {
            path: '/',
            component: MultiContent,
            children: [
              {
                path: '/',
                component: MainContent,
                children: [
                  {
                    path: '/',
                    name: 'ListPartners',
                    component: ListPartners
                  },
                  {
                    path: '/list-products',
                    name: 'ListProducts',
                    component: ListProducts
                  },
                ],
              }
            ],
          },
          {
            path: '/',
            component: SingleContent,
            children: [
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
            ],
          }
        ]
      },
    ]
  },
  // {
  //   path: '/content',
  //   name: 'Content',
  //   component: Content,
  //   children: [
  //     {
  //       path: '/multicontent',
  //       name: 'MultiContent',
  //       component: MultiContent
  //     },
  //     {
  //       path: '/singlecontent',
  //       name: 'SingleContent',
  //       component: SingleContent
  //     }
  //   ]

  // },
  // {
  //   path: '/multicontent',
  //   name: 'MultiContent',
  //   component: MultiContent,
  //   children: [
  //     {
  //       path: '/maincontent',
  //       name: 'MainContent',
  //       component: MainContent,
  //     }
  //   ],
  // },
  // {
  //   path: '/singlecontent',
  //   name: 'SingleContent',
  //   component: SingleContent,
  //   children: [
  //     {
  //       path: '/product-details',
  //       name: 'ProductDetail',
  //       component: ProductDetail
  //     },
  //     {
  //       path: '/cart',
  //       name: 'Cart',
  //       component: Cart,
  //       meta: {
  //         auth: true
  //       },
  //     },
  //     {
  //       path: '/checkout',
  //       name: 'Checkout',
  //       component: Checkout,
  //       meta: {
  //         auth: true
  //       },
  //     },
  //     {
  //       path: '/profile',
  //       name: 'Profile',
  //       component: Profile,
  //       meta: {
  //         auth: true
  //       },
  //     },
  //     {
  //       path: '/orderconfirm',
  //       name: 'OrderConfirm',
  //       component: OrderConfirm,
  //       meta: {
  //         auth: true
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/maincontent',
  //   name: 'MainContent',
  //   component: MainContent,
  //   children: [
  //     {
  //       path: '/list-partner',
  //       name: 'ListPartners',
  //       component: ListPartners
  //     },
  //     {
  //       path: '/list-products',
  //       name: 'ListProducts',
  //       component: ListProducts
  //     },
  //   ],
  // },
  // {
  //   path: '/product-details',
  //   name: 'ProductDetail',
  //   component: ProductDetail
  // },
  // {
  //   path: '/list-products',
  //   name: 'ListProducts',
  //   component: ListProducts
  // },
  // {
  //   path: '/cart',
  //   name: 'Cart',
  //   component: Cart,
  //   meta: {
  //     auth: true
  //   },
  // },
  // {
  //   path: '/checkout',
  //   name: 'Checkout',
  //   component: Checkout,
  //   meta: {
  //     auth: true
  //   },
  // },
  // {
  //   path: '/profile',
  //   name: 'Profile',
  //   component: Profile,
  //   meta: {
  //     auth: true
  //   },
  // },
  {
    path: '/login',
    name: 'Loginn',
    component: Loginn,
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem("token")){
        next("/");
      }else{
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
  // {
  //   path: '/orderconfirm',
  //   name: 'OrderConfirm',
  //   component: OrderConfirm,
  //   meta: {
  //     auth: true
  //   },
  // },
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

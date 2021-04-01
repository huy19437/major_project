import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Loginn from '@/components/login/Loginn.vue'
import Forgot from '@/components/login/Forgot.vue'
import ResetPass from '@/components/login/ResetPass.vue'
import { content } from './content'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/content',
    component: Home,
    children: [
      ...content
    ]
  },
  
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

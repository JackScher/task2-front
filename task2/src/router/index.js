import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Confirm from '../views/Confirm.vue'
import LogedIn from "@/views/LogedIn";
import ProfileView from "@/views/ProfileView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/verify-email',
    name: 'Confirm',
    component: Confirm
  },
  {
    path: '/logedin',
    name: 'LogedIn',
    component: LogedIn
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView
  },
]

const router = new VueRouter({
  routes
})

export default router

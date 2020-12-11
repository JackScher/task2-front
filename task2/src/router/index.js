import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import Confirm from '../views/Confirm.vue'
// import LogedIn from "@/views/LogedIn";
// import ProfileView from "@/views/ProfileView";
import BaseView from "@/views/rework/entrance/BaseView";
import LoginView from "@/views/rework/entrance/LoginView";
import RegisterView from "@/views/rework/entrance/RegisterView";
import ConfirmEmailView from "@/views/rework/entrance/ConfirmEmailView";

import ProfileView from "@/views/rework/profile/ProfileView";
import SelfProfileView from "@/views/rework/profile/SelfProfileView";
import EditProfileView from "@/views/rework/profile/EditProfileView";
import ProfileEditItem from "@/views/rework/profile/ProfileEditItem";

import ModeratorView from "@/views/rework/moderator/ModeratorView";
import ModeratorProfileView from "@/views/rework/moderator/ModeratorProfileView";
import ModeratorEditItem from "@/views/rework/moderator/ModeratorEditItem";
import ConfirmModeratorView from "@/views/rework/moderator/ConfirmModeratorView";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'base-view',
    component: BaseView,
    children: [
      {
        path: '',
        name: 'login-view',
        component: LoginView,
      },
      {
        path: '/register',
        name: 'register-view',
        component: RegisterView,
      },
      {
        path: '/confirm',
        name: 'confirm-view',
        component: ConfirmEmailView,
      },
    ],
  },
  {
    path: '/profile',
    name: 'profile-view',
    component: ProfileView,
    children: [
      {
        path: '',
        name: 'self-profile-view',
        component: SelfProfileView,
      },
      {
        path: 'edit',
        name: 'edit-profile-view',
        component: EditProfileView,
      },
      {
        path: 'edit-item',
        name: 'profile-edit-item-view',
        component: ProfileEditItem,
      },
    ]
  },
  {
    path: '/moderator',
    name: 'moderator-view',
    component: ModeratorView,
    children: [
      {
        path: '',
        name: 'moderator-page-view',
        component: ModeratorProfileView,
      },
      {
        path: 'edit',
        name: 'moderator-edit-view',
        component: ModeratorEditItem,
      },
      {
        path: 'confirm',
        name: 'confirm-moderator-view',
        component: ConfirmModeratorView,
      },
    ],
  },
]
  // {
  //   path: '/profile',
  //   name: 'profile-view',
  //   component: SelfProfileView,
  // },
  // {
  //   path: '/profile/edit',
  //   name: 'edit-profile-view',
  //   component: EditProfileView,
  // },
  // {
  //   path: '/moderator',
  //   name: 'moderator-view',
  //   component: ModeratorView,
  // },




// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   },
//   {
//     path: '/verify-email',
//     name: 'Confirm',
//     component: Confirm
//   },
//   {
//     path: '/logedin',
//     name: 'LogedIn',
//     component: LogedIn
//   },
//   {
//     path: '/profile',
//     name: 'Profile',
//     component: ProfileView
//   },
// ]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

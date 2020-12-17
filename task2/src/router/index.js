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
import ForeignProfileView from "@/views/rework/profile/ForeignProfileView";

import ModeratorView from "@/views/rework/moderator/ModeratorView";
import ModeratorProfileView from "@/views/rework/moderator/ModeratorProfileView";
import ModeratorEditItem from "@/views/rework/moderator/ModeratorEditItem";
import ConfirmModeratorView from "@/views/rework/moderator/ConfirmModeratorView";

import ChatView from "@/views/rework/chat/ChatView";
import QuestionsListView from "@/views/rework/chat/QuestionsListView";
import QuestionItemView from "@/views/rework/chat/QuestionItemView";
import EditCommentView from "@/views/rework/chat/EditCommentView";
import CreateCommentComment from "@/views/rework/chat/CreateCommentComment";
import AddQuestionView from "@/views/rework/chat/AddQuestionView";
import AddAnswerView from "@/views/rework/chat/AddAnswerView";
import AddCommentView from "@/views/rework/chat/AddCommentView";

import TagsView from "@/views/rework/tags/TagsView"
import TagsListView from "@/views/rework/tags/TagsListView"
import CreateTagView from "@/views/rework/tags/CreateTagView"

import SkillView from "@/views/rework/skills/SkillView"
import SkillsListView from "@/views/rework/skills/SkillsListView"
import SkillItemView from "@/views/rework/skills/SkillItemView"
import SkillAddTagView from "@/views/rework/skills/SkillAddTagView"
import AddSkillView from "@/views/rework/skills/AddSkillView"



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
      {
        path: 'foreign',
        name: 'foreign-profile-view',
        component: ForeignProfileView,
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
  {
    path: '/chat',
    name: 'chat-view',
    component: ChatView,
    children: [
      {
        path: 'list',
        name: 'questions-list',
        component: QuestionsListView,
      },
      {
        path: 'add',
        name: 'add-question-view',
        component: AddQuestionView,
      },
      {
        path: 'item',
        name: 'question-item-view',
        component: QuestionItemView,
      },
      {
        path: 'edit-comment',
        name: 'edit-comment-view',
        component: EditCommentView,
      },
      {
        path: 'create-comment-comment',
        name: 'create-comment-comment-view',
        component: CreateCommentComment,
      },
      {
        path: 'create-answer',
        name: 'create-answer-view',
        component: AddAnswerView,
      },
      {
        path: 'create-comment',
        name: 'create-comment-view',
        component: AddCommentView,
      },
    ]
  },
  {
    path: '/tags',
    name: 'tags-view',
    component: TagsView,
    children: [
      {
        path: 'list',
        name: 'tags-list-view',
        component: TagsListView,
      },
      {
        path: 'create',
        name: 'tags-create-view',
        component: CreateTagView,
      },
    ]
  },
  {
    path: '/skills',
    name: 'skills-view',
    component: SkillView,
    children: [
      {
        path: 'list',
        name: 'skills-list',
        component: SkillsListView,
      },
      {
        path: 'item',
        name: 'skill-item',
        component: SkillItemView,
      },
      {
        path: 'add_tag',
        name: 'skill-add-tag',
        component: SkillAddTagView,
      },
      {
        path: 'add',
        name: 'add-skill',
        component: AddSkillView,
      },
    ]
  },
]




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

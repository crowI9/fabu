import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DemandConfig from '../views/DemandConfig.vue'
import Profile from '../views/Profile.vue'
import CompanyHome from '../views/CompanyHome.vue'
import Message from '../views/Message.vue'
import Chat from '../views/Chat.vue'
import DemandList from '../views/DemandList.vue'
import DemandManage from '../views/DemandManage.vue'
import Todo from '../views/Todo.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/demand-config',
    name: 'DemandConfig',
    component: DemandConfig
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/company-home',
    name: 'CompanyHome',
    component: CompanyHome
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/demand-list',
    name: 'DemandList',
    component: DemandList
  },
  {
    path: '/demand-manage',
    name: 'DemandManage',
    component: DemandManage
  },
  {
    path: '/todo',
    name: 'Todo',
    component: Todo
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

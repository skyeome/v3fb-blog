import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }]
  },
  {
    path: '/write',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/WritePage.vue') }]
  },
  {
    path: '/posts',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PostListPage.vue') }]
  },
  {
    path: '/post/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PostPage.vue') }]
  },
  {
    path: '/post/:id/update',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/UpdatePage.vue') }]
  },
  {
    path: '/users',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/UsersPage.vue') }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

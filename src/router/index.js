import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/login/index.vue';
import Layout from '@/views/layout/index.vue';
import Repo from '@/views/repo/index.vue';
import RepoList from '@/views/repo/views/repo-list.vue';
import RepoDetail from '@/views/repo/views/repo-detail.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'main',
    component: Layout,
    children: [
      {
        path: 'repos',
        name: 'repo',
        component: Repo,
        children: [
          {
            path: '',
            name: 'repoList',
            component: RepoList,
          },
          {
            path: ':id',
            name: 'repoDetail',
            component: RepoDetail,
          },
        ],
      },
      { path: '', redirect: 'repos' },
    ],
  },
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

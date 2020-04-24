import Vue from 'vue';
import RepoList from '@/views/repo/views/repo-list.vue';
import RepoDetail from '@/views/repo/views/repo-detail.vue';
import RepoTest from '@/views/repo/views/repo-test.vue';

const index = Vue.extend({
  template: '<router-view/>',
});
export default {
  path: 'repos',
  name: 'repo',
  component: index,
  children: [
    {
      path: ':id/tests',
      name: 'RepoTest',
      component: RepoTest,
    },
    {
      path: ':id',
      name: 'repoDetail',
      component: RepoDetail,
    },
    {
      path: '',
      name: 'repoList',
      component: RepoList,
    },
  ],
};

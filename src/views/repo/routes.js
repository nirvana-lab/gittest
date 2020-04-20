import Vue from 'vue';
import RepoList from '@/views/repo/views/repo-list.vue';
import RepoDetail from '@/views/repo/views/repo-detail.vue';

const index = Vue.extend({
  template: '<router-view/>',
});
export default {
  path: 'repos',
  name: 'repo',
  component: index,
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
};

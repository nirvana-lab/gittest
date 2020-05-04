import Vue from 'vue';
import RepoList from '@/views/repo/views/repo-list.vue';
import RepoDetail from '@/views/repo/views/repo-detail.vue';
import RepoSwagger from '@/views/repo/views/repo-swagger.vue';
import RepoTask from '@/views/repo/views/repo-task.vue';
import RepoVariable from '@/views/repo/views/repo-variable.vue';
import RepoTest from '@/views/repo/views/repo-test.vue';
import RepoTestCreate from '@/views/repo/views/repo-test-create.vue';
import RepoTestEdit from '@/views/repo/views/repo-test-edit.vue';

const index = Vue.extend({
  template: '<router-view/>',
});
export default {
  path: 'repos',
  component: index,
  children: [
    {
      path: ':id/tests',
      component: RepoTest,
      children: [
        {
          path: ':test',
          name: 'RepoTestEdit',
          component: RepoTestEdit,
        },
        {
          path: '',
          name: 'RepoTest',
          component: RepoTestCreate,
        },
      ],
    },
    {
      path: ':id',
      component: RepoDetail,
      children: [{
        path: 'tasks',
        name: 'RepoTask',
        component: RepoTask,
      }, {
        path: 'doc',
        name: 'RepoDoc',
        component: RepoSwagger,
      }, {
        path: 'variable',
        name: 'RepoVariable',
        component: RepoVariable,
      }, {
        path: '',
        name: 'RepoDetail',
        redirect: { name: 'RepoDoc' },
      }],
    },
    {
      path: '',
      name: 'RepoList',
      component: RepoList,
    },
  ],
};

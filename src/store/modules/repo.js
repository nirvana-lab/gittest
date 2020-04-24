import * as userService from '@/services/userService';

const types = {
  SET_REPOS: 'SET_REPOS',
  SET_GIT_REPOS: 'SET_GIT_REPOS',
  SET_RAW: 'SET_RAW',
};

// initState
const initState = {
  repos: [],
  gitRepos: [],
  raw: '',
};

// mutations
const mutations = {
  [types.SET_REPOS](state, data) {
    state.repos = data;
  },
  [types.SET_GIT_REPOS](state, data) {
    state.gitRepos = data;
  },
  [types.SET_RAW](state, data) {
    state.raw = data;
  },
};

// actions
const actions = {
  GET_REPOS: ({ commit, rootState }) => userService.getProjects(rootState.global.user.id).then(({ data }) => {
    commit(types.SET_REPOS, data);
  }),
  GET_GIT_REPOS: ({ commit }) => userService.getAllProjects().then(({ data }) => {
    commit(types.SET_GIT_REPOS, data);
  }),
  POST_REPO: (_, id) => userService.postProject(id),
  GET_FILE: ({ commit }, { id, path, branch }) => {
    commit(types.SET_RAW, '');
    return userService
      .getRepoTreeFile(id, path, branch).then(({ data }) => {
        commit(types.SET_RAW, data);
      });
  },
};
// getters
const getters = {
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};
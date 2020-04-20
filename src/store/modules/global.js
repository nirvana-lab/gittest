import * as userService from '@/services/userService';

const types = {
  SET_USER: 'SET_USER',
  SET_REPOS: 'SET_REPOS',
  SET_GIT_REPOS: 'SET_GIT_REPOS',
};

// initState
const initState = {
  user: {},
  repos: [],
  gitRepos: [],
};

// mutations
const mutations = {
  [types.SET_USER](state, data) {
    state.user = data;
  },
  [types.SET_REPOS](state, data) {
    state.repos = data;
  },
  [types.SET_GIT_REPOS](state, data) {
    state.gitRepos = data;
  },
};

// actions
const actions = {
  GET_USER: ({ commit }) => userService.getUser().then(({ data }) => {
    commit(types.SET_USER, data);
  }),
  GET_REPOS: ({ commit, state }) => userService.getProjects(state.user.id).then(({ data }) => {
    commit(types.SET_REPOS, data);
  }),
  GET_GIT_REPOS: ({ commit }) => userService.getAllProjects().then(({ data }) => {
    commit(types.SET_GIT_REPOS, data);
  }),
  POST_REPO: (_, id) => userService.postProject(id),
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

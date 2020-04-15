import * as userService from '@/services/userService';

const types = {
  SET_USER: 'SET_USER',
  SET_REPOS: 'SET_REPOS',
};

// initState
const initState = {
  user: {},
  repos: [],
};

// mutations
const mutations = {
  [types.SET_USER](state, data) {
    state.user = data;
  },
  [types.SET_REPOS](state, data) {
    state.repos = data;
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

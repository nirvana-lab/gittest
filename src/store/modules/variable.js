import * as testService from '@/services/testService';

const types = {
  SET_ENVS: 'SET_ENVS',
  SET_ENV_ID: 'SET_ENV_ID',
};

// initState
const initState = {
  envs: [],
  env: -1,
};

// mutations
const mutations = {
  [types.SET_ENVS](state, data) {
    state.envs = data;
  },
  [types.SET_ENV_ID](state, id) {
    state.env = id;
  },
};

// actions
const actions = {
  GET_ENVS: ({ commit }, {
    id, ref, path,
  }) => testService.getEnvs({
    params: {
      project_id: id, file_path: path, ref,
    },
  }).then(({ data }) => {
    commit(types.SET_ENVS, data.data);
  }),
  // UPDATE_TEST: ({ commit }, id) => commit(types.SET_TEST_ID, id),
  // CREATE_TEST: ({ commit }) => commit(types.SET_TEST_ID, -1),
  // CLEAR_TEST: ({ commit }) => {
  //   commit(types.SET_TESTS, []);
  //   commit(types.SET_TEST_ID, -1);
  // },
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

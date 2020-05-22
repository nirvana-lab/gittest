import * as taskService from '@/services/taskService';

const types = {
  SET_TASKS: 'SET_TASKS',
  SET_CASES: 'SET_CASES',
  SET_CASES_MAP: 'SET_CASES_MAP',
  SET_TASK: 'SET_TASK',
  SET_CURRENT: 'SET_CURRENT',
};

// initState
const initState = {
  tasks: [],
  cases: {},
  casesMap: {},
  task: {},
  current: '',
};

// mutations
const mutations = {
  [types.SET_TASKS](state, data) {
    state.tasks = data;
  },
  [types.SET_CASES](state, data) {
    state.cases = data;
  },
  [types.SET_CASES_MAP](state, data) {
    state.casesMap = data;
  },
  [types.SET_TASK](state, data) {
    state.task = data;
  },
  [types.SET_CURRENT](state, data) {
    state.current = data;
  },
};

// actions
const actions = {
  CLEAR_TASK: ({ commit }) => {
    commit(types.SET_CURRENT, '');
    commit(types.SET_TASK, {});
  },
  GET_TASKS: ({ commit }, params) => taskService.getTasks(params).then(({ data }) => {
    commit(types.SET_TASKS, data.data);
  }),
  GET_ALL_TESTCASES: ({ commit }, params) => taskService.getAllTestCases(params).then(({ data }) => {
    const result = {};
    Object.keys(data.data).forEach((key) => {
      const temp = key.split('|');
      const m = result[temp[1]];
      if (!m) {
        result[temp[1]] = {};
      }
      const n = result[temp[1]][temp[0]];
      if (!n) {
        result[temp[1]][temp[0]] = [];
      }
      result[temp[1]][temp[0]].push(data.data[key]);
    });
    commit(types.SET_CASES, data.data);
    commit(types.SET_CASES_MAP, result);
  }),
  GET_TASK: ({ commit }, id) => {
    commit(types.SET_CURRENT, '');
    commit(types.SET_TASK, {});
    return taskService
      .getTask(id)
      .then(({ data }) => {
        commit(types.SET_CURRENT, id);
        commit(types.SET_TASK, data.data.suit_content);
      });
  },
  UPDATE_TASK: ({ commit }, { data, id }) => taskService
    .updateTask(data, id)
    .then(() => {
      commit(types.SET_TASK, data);
    }),
  CREATE_TASK: ({ dispatch }, { params, data }) => taskService.createTask(data, params).then(() => dispatch('GET_TASKS', params)),
  DELETE_TASK: (_null, id) => taskService.deleteTask(id),
  RUN_TEST: (_null, id) => taskService.runTask(id),
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

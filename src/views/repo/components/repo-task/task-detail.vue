<template>
  <div v-if="this.current">
     <div class="title">
      <VueDropdown buttonClass="icon-button round flat small" class="r" icon-right="more_vert">
        <VueDropdownButton @click="show = true">Delete</VueDropdownButton>
      </VueDropdown>
      <vue-button v-if="changed" small class="black round r mr-10" @click="handleSave" label="Save"/>
      <span class="name mr-5">Cases</span>
      <vue-button small class="icon-button round purple flat" @click="add = true" iconLeft="add_circle"/>
    </div>
    {{data}}
    <nv-table odd>
      <col width="65%" />
      <col width="100%" />
      <col width="32px" />
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, index) in data" :key="index">
          <td>
            <input v-model="value.key" class="input long small" type="text" />
          </td>
          <td>
            <VueSelect
              v-model="value.env_id"
              button-class="white small"
              class="mr-5 db"
              placeholder="Select Environment"
            >
              <VueSelectButton v-for="i in envs" :key="i.id" :value="i.id" :label="i.env" />
            </VueSelect>
          </td>
          <td>
            <vue-button
              small
               @click="handleDelete(index)"
              class="icon-button round red flat"
              iconLeft="remove_circle"
            />
          </td>
        </tr>
      </tbody>
    </nv-table>
    <TaskDelete v-if="show" :show.sync="show" :id="current"/>
    <TaskCases v-if="add" :show.sync="add" @handleAdd="handleAdd"/>
  </div>
</template>

<script>
import TaskDelete from './task-delete.vue';
import TaskCases from './task-cases.vue';

export default {
  name: 'Repotask',
  components: { TaskDelete, TaskCases },
  data() {
    return {
      data: [],
      copy: '',
      show: false,
      add: false,
    };
  },
  watch: {
    current() {
      const result = [...this.task.task];
      this.data = result;
      this.copy = JSON.stringify(result);
    },
  },
  computed: {
    task() {
      return this.$store.state.task;
    },
    envs() {
      return this.$store.state.variable.envs;
    },
    current() {
      return this.task.current;
    },
    changed() {
      return this.copy !== JSON.stringify(this.data);
    },
  },
  mounted() {
    if (this.current !== '') {
      this.$store.dispatch('task/GET_TASK', this.current);
    }
  },
  methods: {
    handleSave() {
      this.$store.dispatch('task/UPDATE_TASK', { id: this.current, data: this.data.filter((i) => i.env_id && i.exec_id) });
    },
    handleAdd(cases) {
      this.data = [this.data, cases];
    },
    handleDelete(index) {
      this.data.splice(index, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/colors.scss";
.title {
  font-size: 13px;
  padding: 0 5px 5px;
  font-weight: 600;
  .name {
    vertical-align: text-bottom;
  }
}
</style>

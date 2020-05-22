<template>
  <vue-loading class="big pt-5" v-if="loading" />
  <div class="repo-task" v-else>
    <div class="repo-task-right">
      <TaskDetail/>
    </div>
  </div>
</template>

<script>
import TaskDetail from '../components/repo-task/task-detail.vue';

export default {
  name: 'RepoVariable',
  components: { TaskDetail },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    repo() {
      return this.$store.state.repo.gitRepo;
    },
  },
  methods: {
    handleFetch() {
      this.loading = true;
      const {
        file, ref,
      } = this.$route.query;
      const { id } = this.$route.params;
      if (file && id) {
        const params = { project_id: id, file_path: file, ref: ref || this.repo.default_branch };
        this.$store.dispatch('variable/GET_ENVS', params);
        this.$store.dispatch('task/GET_ALL_TESTCASES', params);
        this.$store.dispatch('task/GET_TASKS', params).then(() => {
          this.loading = false;
        });
      }
    },
  },
  mounted() {
    // this.handleFetch();
  },
  watch: {
    $route() {
      this.handleFetch();
      this.$store.dispatch('task/CLEAR_TASK');
    },
  },
};
</script>
<style lang="scss" scoped>
.repo-task {
  flex-grow: 1;
  display: flex;
  min-height: 1px;
}
.repo-task-left{
  width: 200px;
  display: flex;
  overflow: auto;
  flex-shrink: 0;
  min-height: 1px;
  flex-direction: column;
}
.repo-task-right{
  flex-grow: 1;
  width: 100%;
  min-height: 1px;
  overflow: auto;
  padding: 0px 15px 10px;
}
</style>

<template>
  <div class="tasks">
    <div class="title">
      <span class="name mr-5">Task</span>
      <vue-button
        @click="create = true"
        small
        class="icon-button round purple flat"
        iconLeft="add_circle"
      />
    </div>
    <VueModal v-if="create" title="Create Env" class="small" @close="create = false">
      <div class="default-body">
        <h4 class="mb-5">Name</h4>
        <vue-input class="db warning" small type="text" v-model="form.suit" />
        <h4 class="mb-5">Description</h4>
        <vue-input class="db warning" small type="text" v-model="form.description" />
      </div>
      <div slot="footer" class="actions">
        <div class="space"></div>
        <VueButton
          class="purple round"
          :disabled="!form.suit.length"
          @click="handleCreate"
          :loading="loadingCreate"
          >Confirm</VueButton
        >
        <VueButton class="flat round" @click="create = false">Cancel</VueButton>
      </div>
    </VueModal>
  </div>
</template>

<script>

export default {
  name: 'RepoTask',
  data() {
    return {
      loading: true,
      create: false,
      loadingCreate: false,
      form: {
        description: '',
        suit: '',
      },
    };
  },
  computed: {
    current() {
      return this.$store.state.task.current;
    },
    repo() {
      return this.$store.state.repo.gitRepo;
    },
  },
  methods: {
    handleGetEnv(id) {
      this.$store.dispatch('task/GET_TASK', id);
    },
    handleCreate() {
      this.loadingCreate = true;
      const { file, ref } = this.$route.query;
      const { id } = this.$route.params;
      const params = {
        project_id: id,
        file_path: file,
        ref: ref || this.repo.default_branch,
      };
      this.$store.dispatch('task/CREATE_TASK', {
        params,
        data: { ...this.form, suit_content: [] },
      }).then(() => {
        this.loadingCreate = false;
        this.create = false;
        this.form = {
          description: '',
          suit: '',
        };
      }).catch(() => {
        this.create = false;
        this.loadingCreate = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 13px;
  padding: 0 5px 5px;
  font-weight: 600;
  .name {
    vertical-align: text-bottom;
  }
}
.tasks {
  padding-bottom: 10px;
  padding-right: 5px;
  flex-grow: 1;
  min-height: 1px;
  overflow: auto;
  border-style: solid;
  border-width: 0 1px 0 0;
  border-image-source: radial-gradient(circle at 50% 3%, rgba(193, 201, 209, 0.53), rgba(255, 255, 255, 0.2));
  border-image-slice: 1;
}
.task {
  cursor: pointer;
  padding: 5px;
  user-select: none;
  border-radius: 4px;
  &:hover {
    background-color: rgba(193, 201, 209, 0.53);
  }
  &.active {
    background-color: rgba(193, 201, 209, 0.53);
  }
}
</style>

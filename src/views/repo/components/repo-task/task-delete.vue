<template>
  <VueModal title="Delete Task" class="small" @close="$emit('update:show', false)">
    <div class="body">
      Do you want to delete task?
    </div>
    <div slot="footer" class="actions">
      <div class="space"></div>
      <VueButton
        class="red round"
        @click="handleDelete"
        :loading="loadingDelete"
        >Confirm</VueButton
      >
      <VueButton :disabled="loadingDelete" class="flat round" @click="$emit('update:show', false)">Cancel</VueButton>
    </div>
  </VueModal>
</template>

<script>
export default {
  name: 'EnvDeleteDialog',
  props: ['id'],
  data() {
    return {
      loadingDelete: false,
    };
  },
  computed: {
    repo() {
      return this.$store.state.repo.gitRepo;
    },
  },
  methods: {
    handleDelete() {
      this.$store.dispatch('task/DELETE_TASK', this.id).then(() => {
        const { file, ref } = this.$route.query;
        const { id } = this.$route.params;
        const params = {
          project_id: id,
          file_path: file,
          ref: ref || this.repo.default_branch,
        };
        this.$store.dispatch('task/GET_TASKS', params);
        this.$store.dispatch('task/CLEAR_TASK');
        this.$emit('update:show', false);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/colors.scss";
.body{
  padding: 0 24px;
}
.title {
  font-size: 13px;
  padding: 0 5px 5px;
  font-weight: 600;
  .name {
    vertical-align: text-bottom;
  }
}
</style>

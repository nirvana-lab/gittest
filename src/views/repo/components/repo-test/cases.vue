<template>
  <div class="repo-test-cases">
  </div>
</template>
<script>
export default {
  methods: {
    handleFetch() {
      const { params, query } = this.$route;
      this.$store.dispatch('test/GET_TESTS', {
        projectId: params.id, filePath: query.file, ref: query.branch, method: query.method, path: query.path,
      });
    },
  },
  mounted() {
    this.handleFetch();
  },
};
</script>
<style lang="scss" scoped>
</style>

<template>
  <div class="">
    <div class="repo-info mb-10">
      <vue-button
        small
        class="icon-button round mr-10 white"
        @click="handleBack"
        iconLeft="chevron_left"
      />
      <span class="title">{{ paths.summary }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RepoInfo',
  props: ['paths'],
  computed: {
    method() {
      const { method } = this.$route.query;
      if (method) {
        return method.toLowerCase();
      }
      return '';
    },
  },
  methods: {
    handleBack() {
      if (!this.$route.query.branch || !this.$route.query.branch) {
        this.$router.push({
          name: 'repoList',
        });
      }
      this.$router.push({
        name: 'repoDetail',
        params: { id: this.$route.params.id },
        query: {
          file: this.$route.query.file,
          branch: this.$route.query.branch,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.repo-info {
  flex-shrink: 0;
  padding: 12px;
  border-radius: 4px;
  background-color: #1b1c1d;
  color: #fff;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
  .title {
    font-weight: 500;
    vertical-align: text-bottom;
  }
}
</style>

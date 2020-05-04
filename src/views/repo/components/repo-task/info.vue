<template>
  <div class="">
    <div class="repo-info mb-10">
      <div class="mb-10">
        <vue-button
          small
          class="icon-button round mr-10"
          @click="handleBack"
          iconLeft="chevron_left"
        />
        <span class="repo-test-method vm" :class="$route.query.method">
          {{ $route.query.method }}
        </span>
      </div>
      <span class="repo-test-path">
        {{ $route.query.path }}
      </span>
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
      if (!this.$route.query.ref || !this.$route.query.ref) {
        this.$router.push({
          name: 'RepoList',
        });
      }
      this.$router.push({
        name: 'RepoDetail',
        params: { id: this.$route.params.id },
        query: {
          file: this.$route.query.file,
          ref: this.$route.query.ref,
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
  background-color: #2d3444;
  color: #fff;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
  .title {
    font-weight: 500;
    vertical-align: text-bottom;
  }
}
.repo-test-method {
  font-size: 13px;
  font-weight: 500;
  min-width: 57px;
  padding: 5px 10px;
  text-align: center;
  display: inline-block;
  border-radius: 3px;
  font-family: sans-serif;
  background-color: #fff;
  color: #fff;
  &.POST {
    background-color: #49cc90;
  }
  &.PUT {
    background-color: #fca130;
  }
  &.DELETE {
    background-color: #f93e3e;
  }
  &.GET {
    background-color: #61affe;
  }
  &.PATCH {
    background-color: #50e3c2;
  }
  &.HEAD {
    background-color: #9012fe;
  }
  &.OPTIONS {
    background-color: #0d5aa7;
  }
  &.DEPRECATED {
    background-color: #ebebeb;
  }
}
.repo-test-path {
  font-size: 12px;
  display: inline-block;
  word-break: break-word;
  font-family: monospace;
  font-weight: 600;
}
</style>

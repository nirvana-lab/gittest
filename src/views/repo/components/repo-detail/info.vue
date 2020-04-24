<template>
  <div class="repo-info">
    <div class="mb-10">
      <vue-button
        small
        class="icon-button round mr-10 white"
        @click="$router.push({ name: 'repoList' })"
        iconLeft="chevron_left"
      />
      <span class="title">{{ data.name }}</span>
    </div>
    <vue-tag small>
      <vue-tag-item>
        <vue-icon icon="call_split"/>{{ data.default_branch }}
      </vue-tag-item>
    </vue-tag>
     <vue-button
       @click="handleToGit"
        iconLeft="class"
        small
        class="icon-button r warning round"
      />
  </div>
</template>
<script>
import * as userService from '@/services/userService';

export default {
  name: 'RepoInfo',
  data() {
    return {
      loading: true,
      data: {},
    };
  },
  methods: {
    handleToGit() {
      window.open(this.data.web_url, '_blank');
    },
  },
  created() {
    userService.getProject(this.$route.params.id).then(({ data }) => {
      this.data = data;
    });
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
  box-shadow: 0 4px 8px 0 rgba(36,46,66,.06);
  .title {
    font-size: 16px;
    font-weight: 500;
    vertical-align: middle;
  }
}
</style>

<template>
  <div class="repo-info">
    <div class="mb5">
      <sui-button
        @click="$router.push({ name: 'repoList' })"
        circular
        icon="angle left"
        size="small"
        color="black"
      />
      <span class="title">{{ data.name }}</span>
    </div>
    <sui-label color="black" size="mini" basic><sui-icon name="random" shield alternate/>{{ data.default_branch }}</sui-label>
     <sui-button
       @click="handleToGit"
        circular
        icon="gitlab"
        size="mini"
        class="r"
        color="orange"
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
  box-shadow: 0 8px 16px 0 rgba(36, 46, 66, 0.2);
  .title {
    font-size: 16px;
    font-weight: 600;
  }
}
</style>

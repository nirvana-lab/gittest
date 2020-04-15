<template>
  <div class="repo-detail">
    <div class="repo-detail-left">
      <RepoInfo/>
      <RepoTree/>
    </div>
    <RepoSwagger/>
  </div>
</template>

<script>
import RepoTree from '../components/repo-tree.vue';
import RepoSwagger from '../components/repo-swagger.vue';
import RepoInfo from '../components/repo-info.vue';

export default {
  name: 'RepoDetail',
  components: { RepoTree, RepoSwagger, RepoInfo },
  data() {
    return {
      loading: true,
    };
  },
};
</script>
<style lang="scss" scoped>
.repo-detail {
  flex-grow: 1;
  display: flex;
  min-height: 1px;
}
.repo-detail-left{
  padding: 15px 0 0 15px;
  display: flex;
  overflow: auto;
  flex-shrink: 0;
  min-height: 1px;
  flex-direction: column;
}
</style>

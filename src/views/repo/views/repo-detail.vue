<template>
  <div class="repo-detail">
    <div class="repo-detail-left">
      <RepoInfo/>
      <RepoTree/>
    </div>
    <div  class="repo-detail-right">
      <NvTab/>
<RepoSwagger/>
    </div>

  </div>
</template>

<script>
import RepoTree from '../components/repo-detail/tree.vue';
import RepoSwagger from '../components/repo-detail/swagger.vue';
import RepoInfo from '../components/repo-detail/info.vue';

export default {
  name: 'RepoDetail',
  components: { RepoTree, RepoSwagger, RepoInfo },
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    if (this.$route.query.path) {
      this.$store.dispatch('repo/GET_FILE', { id: this.$route.params.id, path: this.$route.query.file, branch: this.$route.query.branch });
    }
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
  width: 315px;
  display: flex;
  overflow: auto;
  flex-shrink: 0;
  min-height: 1px;
  flex-direction: column;
  padding: 10px 0px 10px 15px;
}
.repo-detail-right{
  flex-grow: 1;
  width: 100%;
  min-height: 1px;
  overflow: auto;
  padding: 0px 15px 10px;
}
</style>

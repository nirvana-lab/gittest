<template>
  <div class="repo-detail">
    <div class="repo-detail-left">
      <RepoInfo/>
      <RepoTree/>
    </div>
    <div class="repo-detail-right">
      <RepoTab/>
      <router-view class="repo-detail-container" v-if="!loading"></router-view>
    </div>
  </div>
</template>

<script>
import RepoTab from '../components/repo-detail/tab.vue';
import RepoTree from '../components/repo-detail/tree.vue';
import RepoInfo from '../components/repo-detail/info.vue';

export default {
  name: 'RepoDetail',
  components: { RepoTab, RepoTree, RepoInfo },
  data() {
    return {
      loading: true,
    };
  },
  async mounted() {
    await this.$store.dispatch('repo/GET_GIT_REPO', this.$route.params.id);
    this.loading = false;
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
  padding: 15px 0px 10px 15px;
}
.repo-detail-right{
  flex-grow: 1;
  width: 100%;
  min-height: 1px;
  overflow: auto;
  padding: 0px 15px 10px;
}
.repo-detail-container{
  max-width: 950px;
  width: 100%;
  margin: 0 auto;
}
</style>

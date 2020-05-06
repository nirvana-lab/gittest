<template>
  <div class="repo-info">
    <div class="mb-10">
      <vue-button
        small
        class="icon-button round mr-15 orange"
        @click="$router.push({ name: 'RepoList' })"
        iconLeft="chevron_left"
      />
      <span class="title">{{ data.name }}</span>
    </div>
    <vue-button class="black" :label="data.default_branch" />
    <vue-button class="r black" label="项目变量" @click="show = true"/>
    <Variable :show.sync="show" v-if="show"/>
  </div>
</template>
<script>
import Variable from './variable.vue';

export default {
  name: 'RepoInfo',
  components: { Variable },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    data() {
      return this.$store.state.repo.gitRepo;
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
    font-size: 16px;
    font-weight: 500;
    vertical-align: middle;
  }
  .white {
    color: #fff;
    fill: #fff;
  }
}
</style>

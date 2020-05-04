<template>
  <div class="repo-variable">
    <div class="repo-variable-left">
      <Env/>
    </div>
    <div class="repo-variable-right">
      <Variable/>
    </div>
  </div>
</template>

<script>
import Env from '../components/repo-variable/env.vue';
import Variable from '../components/repo-variable/variable.vue';

export default {
  name: 'RepoVariable',
  components: { Env, Variable },
  data() {
    return {
      loading: true,
    };
  },
  watch: {
    $route(newRouter) {
      const {
        file, ref,
      } = newRouter.query;
      const { id } = newRouter.params;
      if (file && ref && id) {
        this.$store.dispatch('variable/GET_ENVS', { id: this.$route.params.id, path: encodeURIComponent(this.$route.query.file), ref: this.$route.query.ref });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.repo-variable {
  flex-grow: 1;
  display: flex;
  min-height: 1px;
}
.repo-variable-left{
  width: 150px;
  display: flex;
  overflow: auto;
  flex-shrink: 0;
  min-height: 1px;
  flex-direction: column;
}
.repo-variable-right{
  flex-grow: 1;
  width: 100%;
  min-height: 1px;
  overflow: auto;
  padding: 0px 15px 10px;
}
</style>

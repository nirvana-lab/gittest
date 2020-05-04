<template>
  <div class="variable-envs">
    <template v-for="(i, index) in data">
      <div
        :key="index"
        class="variable-env ell"
        :class="{'active': $route.query.file === i.path}"
        @click="handleClick(item)"
      >
        <vue-icon class="mr-5" icon="style" />
        {{ i.name }}
      </div>
    </template>
  </div>
</template>

<script>
import * as userService from '@/services/userService';

export default {
  name: 'RepoTree',
  data() {
    return {
      loading: true,
      open: false,
      data: [],
    };
  },
  computed: {},
  methods: {},
  beforeMount() {
    userService.getRepoTree(this.$route.params.id).then(({ data }) => {
      this.loading = false;
      this.data = data;
    });
  },
};
</script>
<style lang="scss" scoped>
.variable-envs {
  padding-bottom: 15px;
  flex-grow: 1;
  min-height: 1px;
  overflow: auto;
}
.variable-env {
  cursor: pointer;
  padding: 5px;
  user-select: none;
  border-radius: 4px;
  font-weight: 500;
  &:hover {
    background-color: rgba(193, 201, 209, 0.53);
  }
  &.active {
    background-color: rgba(193, 201, 209, 0.53);
  }
}
</style>

<template>
  <div>
    <div
      :style="`padding-left: ${deep * 10}px`"
      class="repo-tree-item"
      @click="handleClick(item)"
    >
      <sui-icon
        color="grey"
        :name="item.type === 'tree' ? (open ? 'caret down' : 'caret right') : ''"
      /><sui-icon
        :color="item.type === 'tree'?'black':'grey'"
      :name="item.type === 'tree' ? (open ? 'folder outline' : 'folder') : 'file alternate'" />{{
        item.name
      }}
    </div>
    <template v-if="open">
      <div class="pt5" v-if="loading && !data.length">
        <sui-loader active size="mini" centered inline />
      </div>
      <RepoTreeItem v-for="i in data" :item="i" :key="i.id" :deep="deep + 1" />
    </template>
  </div>
</template>

<script>
import * as userService from '@/services/userService';

export default {
  name: 'RepoTreeItem',
  props: {
    item: {
      default: () => ({}),
      type: Object,
    },
    deep: {
      type: Number,
    },
  },
  data() {
    return {
      loading: true,
      open: false,
      data: [],
    };
  },
  methods: {
    handleClick(i) {
      if (i.type === 'tree') {
        this.open = !this.open;
        this.loading = true;
        userService.getRepoTreePath(this.$route.params.id, i.path).then(({ data }) => {
          this.data = data;
          this.loading = false;
        });
      } else {
        userService.getRepoTreeFile(this.$route.params.id, encodeURIComponent(i.path), 'master').then(() => {});
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.repo-tree-item {
  cursor: pointer;
  padding: 5px 2px;
  user-select: none;
  border-radius: 4px;
  &:hover {
    background-color: rgba(193, 201, 209, 0.53);
  }
}
</style>

<template>
  <div class="test-cases">
     <vue-input
        placeholder="请输入名称进行查看"
        class="flat warning db mb-10"
        icon-left="search"
        v-model.trim="search"
      />
    <div class="test-case">
      <div class="mb-5 b"><vue-icon class="mr-5" icon="assignment"/> case1</div>
      <div class="sm secondary">case1的描述信息</div>
    </div>
    <div class="test-case">
      <div class="mb-5 b"><vue-icon class="mr-5" icon="assignment"/> case3</div>
      <div class="sm secondary">case1的描述信息</div>
    </div>
    <div class="test-case">
      <div class="mb-5 b"><vue-icon class="mr-5" icon="assignment"/> case4</div>
      <div class="sm secondary">case1的描述信息</div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleFetch() {
      const { params, query } = this.$route;
      this.$store.dispatch('test/GET_TESTS', {
        projectId: params.id, filePath: query.file, ref: query.branch, method: query.method, path: query.path,
      });
    },
  },
  mounted() {
    this.handleFetch();
  },
};
</script>
<style lang="scss" scoped>
.test-case{
 cursor: pointer;
  padding: 5px 5px 5px 10px;
  user-select: none;
  border-radius: 4px;
  &:hover {
    background-color: rgba(193, 201, 209, 0.53);
  }
}
</style>

<template>
  <div class="repo-tab">
    <VueGroup v-model="choice" class="mb-10 round" @update="handleChange">
      <VueGroupButton value="RepoDoc" class="round">文档</VueGroupButton>
      <VueGroupButton value="RepoTask" class="round">任务</VueGroupButton>
      <VueGroupButton value="RepoVariable" class="round">文档变量</VueGroupButton>
    </VueGroup>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  data() {
    return {
      choice: this.$route.name,
    };
  },
  methods: {
    handleChange(value) {
      this.$router.push({ name: value, params: this.$route.params, query: this.$route.query });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/colors";
.repo-tab {
  z-index: 1;
  position: sticky;
  top: 0px;
  padding-top: 15px;
  background-color: #fff;
  max-width: 950px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 20px;
  border-style: solid;
  border-width: 0 0 1px;
  border-image-source: radial-gradient(
    circle at 50% 3%,
    rgba(193, 201, 209, 0.53),
    rgba(255, 255, 255, 0.2)
  );
  border-image-slice: 1;
}
</style>

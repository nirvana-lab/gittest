<template>
  <div class="main-tab">
    <div class="tab-item active">文档</div>
    <div class="tab-item">文档变量</div>
    <div class="tab-item">全局变量</div>
  </div>
</template>

<script>
export default {
  name: 'NvTab',
  computed: {
    user() {
      return this.$store.state.global.user;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/colors';
.main-tab{
  z-index: 1;
  position: sticky;
  top: 0px;
  padding-top: 10px;
  background-color: #eff4f9;
  max-width: 950px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 25px;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
}
.tab-item{
  display: inline-block;
  font-weight: 500;
  min-width: 60px;
  text-align: center;
  cursor: pointer;
  padding: 10px 2px;
  margin-right: 20px;
  opacity: 0.4;
  border-bottom: 3px solid transparent;
  &:hover{
    opacity: 1;
  }
  &.active{
    opacity: 1;
    border-color: $vue-ui-warning-500;
  }
}
</style>

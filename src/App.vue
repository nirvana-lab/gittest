<template>
  <router-view/>
</template>
<script>

export default {
};
</script>
<style lang="scss">
html{
  overflow-y: visible;
  margin-right: calc(100% - 100vw);
  background-color: #eff4f9;
  height: 100%;
}
body{
  background:none;
  .ui.card, .ui.cards>.card{
    box-shadow: 0 4px 8px 0 rgba(36,46,66,.06);
  }
}
</style>

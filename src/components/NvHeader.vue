<template>
  <header class="main-header">
    <div class="main-header-bottom"></div>
    <div class="main-header-content">
      <div class="space"></div>
      <div>
        <sui-icon color="orange" size="big" name="gitlab" />
        <span class="main-header-logo">GitTest</span>
      </div>
      <div class="space"></div>
      <sui-image
        avatar
        spaced="right"
        :src="user.avatar_url"
      />
      <sui-dropdown
        :text="user.name"
        class="labeled icon basic"
        floating
      >
        <sui-dropdown-menu>
          <sui-dropdown-item>SignOut</sui-dropdown-item>
        </sui-dropdown-menu>
      </sui-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  name: 'NvHeader',
  computed: {
    user() {
      return this.$store.state.global.user;
    },
  },
};
</script>

<style scoped lang="scss">
.main-header {
  padding: 0 25px 0 15px;
  height: 50px;
  // color: #eee;
  position: relative;
  // background-color: #181d28;
}
.main-header-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.5px;
  border-style: solid;
  border-width: 1px 0 0;
  border-image-source: radial-gradient(
    circle at 50% 3%,
    rgba(193, 201, 209, 0.53),
    hsla(0, 0%, 100%, 0.2)
  );
  border-image-slice: 1;
}
.main-header-content {
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
}
.main-header-logo {
  font-size: 21px;
}
</style>

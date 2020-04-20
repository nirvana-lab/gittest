<template>
  <div class="login">
    <header class="login-header">GitTest</header>
    <div class="login-content">
      <vue-button class="warning" @click="handleLogin">Login in</vue-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  methods: {
    handleLogin() {
      axios.get('/api/sso').then(({ data }) => {
        if (data.url) window.open(data.url, '_self');
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  margin: 0 auto;
  text-align: center;
}
.login-header {
  font-size: 28px;
  font-weight: 700;
  font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑, STHeiti, MingLiu;
  padding: 35px 0;
}
</style>

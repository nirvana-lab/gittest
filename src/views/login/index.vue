<template>
  <div class="login">
    <svg class='logo'>
      <use xlink:href="#icon-logo"></use>
    </svg>
    <header class="login-header">Nirvana</header>
    <div class="mb-30">
    </div>
    <div class="login-content">
      <vue-button class="black round" @click="handleLogin">Get Gitlab Authority</vue-button>
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
  width: 300px;
  margin: 0 auto;
  text-align: center;
  padding: 50px 15px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -250px;
  border-radius: 6px;
}
.login-header {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑, STHeiti, MingLiu;
}
.logo{
  width: 54px;
  height: 54px;
  margin-bottom: 10px;
  vertical-align: bottom;
  fill: #b35bb5;
  margin-right: 10px;
}
.login-notice{
  background-color: #eaeeef;
  padding: 10px;
  border-radius: 6px;
}
</style>

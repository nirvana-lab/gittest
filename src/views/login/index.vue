<template>
  <div class="login">
    <header class="login-header">GitTest</header>
    <div class="login-content">
    <sui-step-group ordered size="tiny">
      <sui-step>
        <sui-icon name="gitlab" color="orange"/>
        <sui-step-content>
          <sui-step-title>Application Setting.</sui-step-title>
          <sui-step-description
            >Set authorized application</sui-step-description
          >
        </sui-step-content>
      </sui-step>
      <sui-step>
        <sui-step-content>
          <sui-step-title>
            <sui-button
              color="orange"
              content="Login in"
              size="small"
              icon="right arrow"
              label-position="right"
              @click="handleLogin"
            />
          </sui-step-title>
          <sui-step-description>Enter GitTest system</sui-step-description>
        </sui-step-content>
      </sui-step>
    </sui-step-group>
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
        if (data.url)window.open(data.url, '_self');
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
.login-content{
  .steps{
    text-align: left;
  }
}
</style>

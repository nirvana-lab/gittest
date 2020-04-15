<template>
  <div class="repo-swagger">
    <div id="myDomId"></div>
  </div>
</template>

<script>
import SwaggerUI from 'swagger-ui';
import './swagger.css';

export default {
  name: 'RepoDetail',
  mounted() {
    SwaggerUI({
      dom_id: '#myDomId',
      url: 'https://petstore.swagger.io/v2/swagger.json',
    });
  },
};
</script>
<style lang="scss" scoped>
.repo-swagger{
  flex-grow: 1;
  min-height: 1px;
  overflow: auto;
  padding: 15px;
}
</style>

<template>
  <div class="repo-detail-swagger"></div>
</template>

<script>
import SwaggerUi from 'swagger-ui';
import yaml from 'js-yaml';

export default {
  name: 'RepoDetailSwagger',
  data() {
    return {
      swagger: null,
    };
  },
  methods: {
    async handleParse() {
      this.swagger = null;
      try {
        this.swagger = SwaggerUi({
          domNode: this.$el,
          spec: this.swaggerData,
        });
        const opblocks = document.getElementsByClassName('opblock-summary');
        opblocks.forEach((opblock) => {
          const link = document.createElement('BUTTON');
          link.innerHTML = '测试用例';
          link.onclick = () => this.$router.push({
            name: 'RepoTest',
            params: this.$route.params,
            query: {
              ...this.$route.query,
              method: opblock.getElementsByClassName('opblock-summary-method')[0].innerHTML,
              path: opblock.getElementsByClassName('opblock-summary-path')[0].getAttribute('data-path'),
            },
          });
          link.className = 'vue-ui-button small black';
          opblock.appendChild(link);
        });
      } catch (err) {
        this.swagger = null;
      }
    },
  },
  computed: {
    swaggerData() {
      try {
        return yaml.safeLoad(this.$store.state.repo.raw);
      } catch (err) {
        return '';
      }
    },
  },
  watch: {
    swaggerData() {
      this.handleParse();
    },
  },
  mounted() {
    if (this.$route.query.file) {
      this.$store.dispatch('repo/GET_FILE', { id: this.$route.params.id, path: this.$route.query.file, branch: this.$route.query.branch });
    }
  },
};
</script>
<style lang="scss" scoped>
.repo-detail-swagger{
  flex-grow: 1;
  width: 100%;
  min-height: 1px;
  overflow: auto;
  padding: 15px 10px 10px 20px;
  max-width: 950px;
  margin: 0 auto;
}
</style>

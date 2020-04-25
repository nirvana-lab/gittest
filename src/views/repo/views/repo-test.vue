<template>
  <div class="repo-test">
    <div class="repo-test-left">
      <Info :paths="paths"/>
      <Cases/>
    </div>
    <div class="repo-test-right">
      <Form :paths="paths"/>
    </div>
  </div>
</template>

<script>
import SwaggerParser from '@apidevtools/swagger-parser';
import yaml from 'js-yaml';
import Info from '../components/repo-test/info.vue';
import Form from '../components/repo-test/form.vue';
import Cases from '../components/repo-test/cases.vue';

export default {
  name: 'RepoTest',
  components: { Info, Form, Cases },
  data() {
    return {
      paths: {
        description: '',
        operationId: '',
        parameters: [],
        responses: {},
        requestBody: {},
        security: [],
        summary: '',
        tags: [],
      },
    };
  },
  methods: {
    async handleParse() {
      try {
        const api = await SwaggerParser.validate(this.filterData);
        const { path, method } = this.$route.query;
        const queryMethod = method.toLowerCase();
        this.paths = api.paths[path][queryMethod];
      } catch (err) {
        this.paths = {
          description: '',
          operationId: '',
          parameters: [],
          responses: {},
          requestBody: {},
          security: [],
          summary: '',
          tags: [],
        };
      }
    },
  },
  computed: {
    filterData() {
      const { path, method } = this.$route.query;
      let paths = {};
      if (this.swaggerData) {
        paths = { ...this.swaggerData.paths };
      }
      if (path && method) {
        const queryMethod = method.toLowerCase();
        paths = {
          [path]: {
            [queryMethod]: this.swaggerData.paths[path][queryMethod],
          },
        };
      }
      return {
        ...this.swaggerData,
        paths,
      };
    },
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
    if (this.$route.query.file && this.$route.query.method && this.$route.query.path && this.$route.query.branch) {
      this.$store.dispatch('repo/GET_FILE', { id: this.$route.params.id, path: this.$route.query.file, branch: this.$route.query.branch });
    }
  },
};
</script>
<style lang="scss" scoped>
.repo-test {
  flex-grow: 1;
  display: flex;
  min-height: 1px;
}
.repo-test-left{
  width: 315px;
  display: flex;
  overflow: auto;
  flex-shrink: 0;
  min-height: 1px;
  flex-direction: column;
  padding: 10px 0px 10px 15px;
}
.repo-test-right{
  flex-grow: 1;
  width: 100%;
  min-height: 1px;
  overflow: auto;
  padding: 10px 15px;
}
</style>

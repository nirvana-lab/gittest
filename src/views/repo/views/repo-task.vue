<template>
  <div class="repo-task">
    Task
  </div>
</template>

<script>
import SwaggerParser from '@apidevtools/swagger-parser';
import yaml from 'js-yaml';

export default {
  name: 'RepoTest',
  components: {
  },
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
    caseId() {
      return this.$store.state.test.caseId;
    },
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
    if (this.$route.query.file && this.$route.query.method && this.$route.query.path && this.$route.query.ref) {
      this.$store.dispatch('repo/GET_FILE', { id: this.$route.params.id, path: encodeURIComponent(this.$route.query.file), ref: this.$route.query.ref });
    }
  },
};
</script>
<style lang="scss" scoped>
</style>

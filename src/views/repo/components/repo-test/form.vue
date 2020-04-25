<template>
  <div class="repo-test-form">
    <div class="mb-15">
      <span class="repo-test-method">
        {{ $route.query.method }}
      </span>
      <span class="repo-test-path">
        {{ $route.query.path }}
      </span>
    </div>
    <div class="clear mb-10">
      <vue-input type="text" v-model="name" class="flat" placeholder="用例名称"/>
      <vue-input type="text" v-model="description" class="flat" placeholder="描述信息"/>
      <vue-button class="r" @click="handleCreate">保存</vue-button>
    </div>
    <div v-for="(properties, key) in parameters" :key="key">
      <Params :title="key" v-model="parameters[key]" />
    </div>
    <div class="repo-test-form-table-title">
      <span class="name mr-5">BODY</span>
    </div>
    <Request v-model="body"/>
    <Response title="RESPONSE" v-model="response"/>
  </div>
</template>
<script>
import * as testService from '@/services/testService';
import Params from './params.vue';
import Request from './request.vue';
import Response from './response.vue';


export default {
  name: 'TestForm',
  components: { Request, Response, Params },
  props: ['paths'],
  data() {
    return {
      description: '',
      name: '',
      parameters: {
        path: [],
        query: [],
        header: [],
      },
      body: '',
      response: [],
    };
  },
  watch: {
    paths() {
      if (this.paths.parameters) {
        this.parameters.path = this.paths.parameters
          .filter((i) => i.in === 'path')
          .map((i) => ({
            description: i.description || '',
            name: i.name || '',
            required: i.required || false,
            type: i.schema.type || 'string',
            assert: '',
          }));
        this.parameters.query = this.paths.parameters
          .filter((i) => i.in === 'query')
          .map((i) => ({
            description: i.description || '',
            name: i.name || '',
            required: i.required || false,
            type: i.schema.type || 'string',
            assert: '',
          }));
        this.parameters.header = this.paths.parameters
          .filter((i) => i.in === 'header')
          .map((i) => ({
            description: i.description || '',
            name: i.name || '',
            required: i.required || false,
            type: i.schema.type || 'string',
            assert: '',
          }));
      }
    },
  },
  methods: {
    handleCreate() {
      const resultParameters = [];
      Object.keys(this.parameters).forEach((key) => {
        resultParameters.concat(this.parameters[key].map((i) => ({
          key: i.name,
          type: i.type,
          assert: i.assert,
          in: key,
        })));
      });
      const resultResponse = [];
      const { params, query } = this.$route;
      resultResponse.concat(this.response.map((i) => ({
        key: i.name,
        key_type: i.type,
        comparator: 'equal',
        expect_value: i.assert,
      })));
      testService.createTest({
        params: {
          projectId: params.id, filePath: query.file, ref: query.branch, method: query.method, path: query.path,
        },
        data: {
          case: this.name,
          description: this.description,
          setup: [],
          parameters: resultParameters,
          body: this.body,
          teardown: [],
          validator: resultResponse,
        },
      }).then(() => {
        this.$store.dispatch('test/GET_TESTS', {
          projectId: params.id, filePath: query.file, ref: query.branch, method: query.method, path: query.path,
        });
      });
    },
  },
  computed: {
    method() {
      const { method } = this.$route.query;
      if (method) {
        return method.toLowerCase();
      }
      return '';
    },
  },
};
</script>
<style lang="scss" scoped>
.repo-test-method {
  font-size: 13px;
  font-weight: 500;
  min-width: 57px;
  padding: 6px 10px;
  text-align: center;
  display: inline-block;
  border-radius: 3px;
  font-family: sans-serif;
  color: #fff;
  background-color: #000;
}
.repo-test-path {
  font-size: 14px;
  display: inline-block;
  align-items: center;
  word-break: break-word;
  padding: 0 10px;
  font-family: monospace;
  font-weight: 600;
}
.repo-test-form {
  max-width: 950px;
  width: 100%;
  margin: 0 auto;
}
.repo-test-form-table-title {
  font-size: 12px;
  padding: 5px 0;
  font-weight: 600;
  border-style: solid;
  border-width: 1px 0 0;
  margin-top: 15px;
  border-image-source: radial-gradient(
    circle at 50% 3%,
    rgba(193, 201, 209, 0.53),
    rgba(255, 255, 255, 0.2)
  );
  border-image-slice: 1;
  .name {
    vertical-align: text-bottom;
  }
}
</style>

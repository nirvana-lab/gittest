<template>
  <div class="repo-test-form">
    <div class="repo-test-tab clear mb-10">
      <VueGroup v-model="choice" class="round">
        <VueGroupButton :value="0" class="round" @click="handleSave">{{choice === 1?'用例':'保存'}}</VueGroupButton>
        <VueGroupButton :value="1" class="round" @click="handleRun">运行</VueGroupButton>
      </VueGroup>
      <vue-button class="round r red flat" @click="deleteDialog= true">删除</vue-button>
    </div>
    <template v-if="choice === 0">
      <div>
        <vue-input type="text" large v-model="name" class="flat b" placeholder="用例名称"/>
        <vue-input type="text" v-model="description" class="flat" placeholder="描述信息"/>
      </div>
      <Params v-model="parameters" />
      <Request v-model="body"/>
      <Response v-model="response"/>
    </template>
    <div v-else>
      <pre class="result-cmd"><vue-loading class="big orange" v-if="loading"/>{{run}}</pre>
    </div>
     <VueModal v-if="deleteDialog" title="删除测试用例" class="small" @close="deleteDialog = false">
      <div class="default-body">
        你确定要删除测试用例吗？
      </div>
      <div slot="footer" class="actions">
        <VueButton class="orange" @click="handleDelete" :loading="loadingDelete">确认</VueButton>
        <VueButton class="flat" @click="create = false" :disabled="loadingDelete">取消</VueButton>
      </div>
    </VueModal>
  </div>
</template>
<script>
import * as testService from '@/services/testService';
import Params from '../components/repo-test/params.vue';
import Request from '../components/repo-test/request.vue';
import Response from '../components/repo-test/response.vue';


export default {
  name: 'TestEdit',
  components: { Request, Response, Params },
  props: ['testCase'],
  data() {
    return {
      loading: true,
      deleteDialog: false,
      loadingDelete: false,
      run: '',
      choice: 0,
      description: '',
      name: '',
      parameters: [],
      body: '',
      response: [],
    };
  },
  watch: {
    $route(newRouter, oldRouter) {
      if (newRouter.params.test !== oldRouter.params.test) {
        this.handleFetch();
      }
    },
  },
  mounted() {
    this.handleFetch();
  },
  methods: {
    handleRun() {
      this.loading = true;
      this.$store.dispatch('test/RUN_TEST', this.$route.params.test).then(({ data }) => {
        this.loading = false;
        this.run = data.result;
      });
    },
    async handleDelete() {
      const { params, query } = this.$route;
      this.loadingDelete = true;
      try {
        await testService.getTest(this.$route.params.test);
        await this.$store.dispatch('test/GET_TESTS', {
          projectId: params.id, filePath: query.file, ref: query.ref || this.repo.default_branch, method: query.method, path: query.path,
        });
        this.$router.push({
          name: 'RepoTest',
          params,
          query,
        });
      } catch (err) {
        this.loadingDelete = false;
        this.deleteDialog = false;
      } finally {
        this.loadingDelete = false;
        this.deleteDialog = false;
      }
    },
    handleFetch() {
      testService.getTest(this.$route.params.test).then(({ data }) => {
        this.description = data.content.description || '';
        this.name = data.content.case || '';
        this.body = data.content.body || '';
        this.response = data.content.validator || [];
        this.parameters = data.content.parameters || [];
      });
    },
    handleSave() {
      if (this.choice === 1) return;
      const resultParameters = this.parameters.map((i) => ({
        key: i.key,
        type: i.type,
        value: i.value,
        in: i.in,
      }));
      testService.updateTest({
        id: this.$route.params.test,
        data: {
          case: this.name,
          description: this.description,
          setup: [],
          teardown: [],
          parameters: resultParameters,
          body: this.body,
          validator: this.response,
        },
      }).then(() => {
        const { params, query } = this.$route;
        this.$store.dispatch('test/GET_TESTS', {
          projectId: params.id, filePath: query.file, ref: query.ref || this.repo.default_branch, method: query.method, path: query.path,
        });
      });
    },
  },
  computed: {
    repo() {
      return this.$store.state.repo.gitRepo;
    },
  },
};
</script>
<style lang="scss" scoped>
.result-cmd{
  background-color: #282c34;
  border-radius: 4px;
  padding: 10px;
  font-size: 12px;
  line-height: 14px;
  color: #fff;
}
.repo-test-form {
  max-width: 950px;
  width: 100%;
  margin: 0 auto;
}
.repo-test-tab{
  padding-bottom: 10px;
  border-style: solid;
  border-width: 0 0 1px 0;
  border-image-source: radial-gradient(
    circle at 50% 3%,
    rgba(193, 201, 209, 0.53),
    rgba(255, 255, 255, 0.2)
  );
  border-image-slice: 1;
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

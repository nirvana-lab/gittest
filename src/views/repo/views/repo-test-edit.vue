<template>
  <div class="repo-test-form">
    <div class="repo-test-tab clear mb-10">
      <vue-button class="round black mr-10" @click="handleSave">Save</vue-button>
      <vue-button iconLeft="bug_report" class="round" @click="handleRun">Run</vue-button>
      <vue-button class="round r red flat" @click="deleteDialog = true">Delete</vue-button>
    </div>
    <vue-loading class="big pt-10" v-if="loading"/>
    <template v-else>
      <nv-table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><vue-input type="text" large v-model="name" class="flat b" /></td>
            <td><vue-input type="text" v-model="description" class="flat" /></td>
          </tr>
        </tbody>
      </nv-table>
      <Params v-model="parameters" />
      <Request v-model="body" />
      <Response v-model="response" />
    </template>
    <VueModal v-if="deleteDialog" title="Delete Test Cases" class="small" @close="deleteDialog = false">
      <div class="default-body">
        Do you want to delete this testcase？
      </div>
      <div slot="footer" class="actions">
        <div class="space"></div>
        <VueButton class="red round" @click="handleDelete" :loading="loadingDelete">Confirm</VueButton>
        <VueButton class="flat round" @click="create = false" :disabled="loadingDelete">Cancel</VueButton>
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
      this.$router.push({
        name: 'RepoTestLog',
        params: this.$route.params,
        query: this.$route.query,
      });
    },
    async handleDelete() {
      const { params, query } = this.$route;
      this.loadingDelete = true;
      try {
        await testService.getTest(this.$route.params.test);
        await this.$store.dispatch('test/GET_TESTS', {
          projectId: params.id,
          filePath: query.file,
          ref: query.ref || this.repo.default_branch,
          method: query.method,
          path: query.path,
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
      this.loading = true;
      testService
        .getTest(this.$route.params.test)
        .then(({ data }) => {
          this.description = data.content.description || '';
          this.name = data.content.case || '';
          this.body = data.content.body || '';
          this.response = data.content.validator || [];
          this.parameters = data.content.parameters || [];
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleSave() {
      const resultParameters = this.parameters.map((i) => ({
        key: i.key,
        type: i.type,
        value: i.value,
        in: i.in,
      }));
      testService
        .updateTest({
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
        })
        .then(() => {
          const { params, query } = this.$route;
          this.$store.dispatch('test/GET_TESTS', {
            projectId: params.id,
            filePath: query.file,
            ref: query.ref || this.repo.default_branch,
            method: query.method,
            path: query.path,
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
.repo-test-form {
  max-width: 950px;
  width: 100%;
  margin: 0 auto;
}
.repo-test-tab {
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

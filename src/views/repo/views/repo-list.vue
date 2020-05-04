<template>
  <div class="repo-list">
    <div class="mb-20">
      <vue-button
        class="black mr-15 l"
        icon-left="add_circle"
        @click="
          getGitRepos();
          create = true;
        "
        label="添加项目"
      />
      <vue-input
        placeholder="请输入名称进行查看"
        class="flat warning db"
        icon-left="search"
        v-model.trim="search"
      />
    </div>
    <h3>
      <span class="mr-10 ml-5">列表</span>
    </h3>
    <vue-loading class="big" v-if="loading" />
    <div class="clear repo-wrapper" v-if="!loading">
      <div class="g-sm-4 g-xs-6" v-for="repo in repos" :key="repo.id">
        <Repo :repo="repo" />
      </div>
    </div>
    <VueModal v-if="create" title="添加项目" class="small" @close="create = false">
      <div class="default-body">
        <VueSelect
          v-model="choose"
          placeholder="选择需要添加的项目"
          button-class="flat"
          style="width: 100%;"
        >
          <VueSelectButton
            :value="repo.id"
            :label="repo.name"
            v-for="repo in gitRepos"
            :key="repo.id"
          />
        </VueSelect>
      </div>
      <div slot="footer" class="actions">
        <VueButton class="orange" @click="handleCreateRepo" :loading="loadingCreate">确认</VueButton>
        <VueButton class="flat" @click="create = false">取消</VueButton>
      </div>
    </VueModal>
  </div>
</template>

<script>
import Repo from '../components/repo-list/repo.vue';

export default {
  name: 'RepoList',
  components: { Repo },
  data() {
    return {
      search: '',
      create: false,
      loading: true,
      loadingCreate: false,
      choose: '',
    };
  },
  computed: {
    repos() {
      return this.$store.state.repo.repos.filter((i) => i.name.includes(this.search));
    },
    gitRepos() {
      return this.$store.state.repo.gitRepos;
    },
  },
  methods: {
    async handleFetch() {
      this.loading = true;
      try {
        await this.$store.dispatch('repo/GET_REPOS');
      } catch (error) {
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },
    async handleCreateRepo() {
      this.loadingCreate = true;
      try {
        await this.$store.dispatch('repo/POST_REPO', this.choose);
      } catch (error) {
        this.loadingCreate = false;
      } finally {
        this.loadingCreate = false;
        this.choose = '';
        this.create = false;
        this.$store.dispatch('repo/GET_REPOS');
      }
    },
    async getGitRepos() {
      await this.$store.dispatch('repo/GET_GIT_REPOS');
    },
  },
  beforeMount() {
    this.handleFetch();
  },
};
</script>
<style lang="scss" scoped>
.repo-list {
  max-width: 950px;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
}
.repo-wrapper {
  margin: 0 -10px;
}
</style>

<template>
  <div class="repo">
    <div class="mb-20">
      <vue-button class="black mr-15" icon-left="add_circle" @click="getGitRepos();create = true" label="添加项目" />
      <vue-input
        placeholder="请输入名称进行查看"
        class="flat warning"
        icon-left="search"
        v-model.trim="search"
      />
    </div>
    <h3>
      <span class="mr-10 ml-5">列表</span>
      <vue-button class="round sm icon-button" small @click="create = true" :label="repos.length" />
    </h3>
    <vue-loading class="big" v-if="loading" />
    <div class="clear" v-if="!loading">
      <div class="g-sm-4 mb-15" v-for="repo in repos" :key="repo.id">
        <div class="repo-card">
          <div class="content">
            <h3 class="name mt-0">{{ repo.name }}</h3>
            <div class="clear">
              <VueAvatar class="small  mr-10" v-if="repo.avatar_url" :src="repo.avatar_url"/>
              <span class="tag">
                <span class="item">{{ repo.namespace.name }}</span>
                <div class="item detail">
                  <vue-icon icon="call_split" />
                  {{ repo.default_branch || "No initial" }}
                </div>
              </span>
              <vue-button
                small
                class="icon-button round flat r"
                icon-left="keyboard_arrow_right"
                @click="$router.push({ name: 'repoDetail', params: { id: repo.id } })"
              />
            </div>
          </div>
          <div class="footer sm secondary">
            <span class="mr-5">更新时间</span
            ><span>
              {{ repo.last_activity_at | dateformat }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <VueModal
        v-if="create"
        title="添加项目"
        class="small"
        @close="create = false"
      >
        <div class="default-body">
          <VueSelect v-model="choose" placeholder="选择需要添加的项目" button-class="flat" style="width: 100%;">
            <VueSelectButton :value="repo.id" :label="repo.name" v-for="repo in gitRepos" :key="repo.id"/>
          </VueSelect>
        </div>
        <div slot="footer" class="actions">
          <VueButton class="warning" @click="handleCreateRepo" :loading="loadingCreate">确认</VueButton>
          <VueButton class="flat" @click="create = false">取消</VueButton>
        </div>
      </VueModal>
  </div>
</template>

<script>
export default {
  name: 'Repo',
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
      return this.$store.state.global.repos.filter((i) => i.name.includes(this.search));
    },
    gitRepos() {
      return this.$store.state.global.gitRepos;
    },
  },
  methods: {
    async handleFetch() {
      this.loading = true;
      try {
        await this.$store.dispatch('global/GET_REPOS');
      } catch (error) {
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },
    async handleCreateRepo() {
      this.loadingCreate = true;
      try {
        await this.$store.dispatch('global/POST_REPO', this.choose);
      } catch (error) {
        this.loadingCreate = false;
      } finally {
        this.loadingCreate = false;
        this.choose = '';
        this.create = false;
        this.$store.dispatch('global/GET_REPOS');
      }
    },
    async getGitRepos() {
      await this.$store.dispatch('global/GET_GIT_REPOS');
    },
  },
  beforeMount() {
    this.handleFetch();
  },
};
</script>
<style lang="scss" scoped>
.repo {
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  padding: 15px;
}
.tag{
  display: inline-block;
  vertical-align: middle;
  line-height: 16px;
  border: 1px solid rgba(34,36,38,.15);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  .item{
    padding: 4px 5px;
    display: inline-block;
  }
  .detail{
    opacity: .9;
    background: rgba(0,0,0,.1);
    padding: 4px 8px 4px 5px;
    border-radius: 0 4px 4px 0;
  }
}
.repo-card {
  background-color: white;
  margin-right: 15px;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
  .content {
    padding: 15px;
  }
  .footer {
    padding: 15px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }
  .name {
    font-size: 14px;
    font-weight: 700;
  }
}
</style>

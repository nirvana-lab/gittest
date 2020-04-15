<template>
  <div class="repo">
    <div>
      <span class="mr15">
        <sui-button compact color="black" size="small" content="添加项目" icon="add" />
      </span>
      <sui-input
        placeholder="请输入名称进行查看"
        transparent
        size="mini"
        icon-position="left"
        icon="search"
      />
    </div>
    <h4 is="sui-header">
      列表<sui-label circular size="tiny">{{ repos.length }}</sui-label>
    </h4>
    <sui-loader active centered inline v-if="loading" />
    <sui-grid :columns="3">
      <sui-grid-row>
        <sui-grid-column v-for="repo in repos" :key="repo.id">
          <div class="mb15">
            <sui-card>
              <sui-card-content>
                <sui-header size="tiny">{{ repo.name }}</sui-header>
                <div class="ui small feed">
                  <div class="event">
                    <div class="content">
                      <sui-image v-if="repo.owner.avatar_url" avatar spaced="right" :src="repo.owner.avatar_url" />
                      <sui-label size="tiny" image basic>
                        <span>{{ repo.owner.name }}</span>
                        <sui-label-detail><sui-icon name="shield alternate" /> {{ repo.visibility }}</sui-label-detail>
                      </sui-label>
                      <sui-button
                        @click="$router.push({ name: 'repoDetail', params: { id: repo.id } })"
                        compact
                        circular
                        basic
                        icon="angle right"
                        class="r"
                        size="mini"
                      />
                    </div>
                  </div>
                </div>
              </sui-card-content>
              <sui-card-content extra>
                <div class="sm">
                  <span class="mr5">更新时间</span
                  ><span>{{ repo.last_activity_at | dateformat }}</span>
                </div>
              </sui-card-content>
            </sui-card>
          </div>
        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>
  </div>
</template>

<script>
export default {
  name: 'Repo',
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    repos() {
      return this.$store.state.global.repos;
    },
  },
  methods: {},
  beforeMount() {
    this.$store.dispatch('global/GET_REPOS').then(() => {
      this.loading = false;
    });
  },
};
</script>
<style lang="scss" scoped>
.repo {
  max-width: 960px;
  min-width: 960px;
  margin: 0 auto;
  padding: 15px;
}
</style>

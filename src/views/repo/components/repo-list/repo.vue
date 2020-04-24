<template>
  <div class="repo">
    <div class="repo-card">
      <div class="content">
        <h3 class="mt-0"><span class="cp" @click="toDetail">{{ repo.name }}</span></h3>
        <div class="clear">
          <vue-avatar class="small  mr-10" v-if="repo.avatar_url" :src="repo.avatar_url"/>
          <vue-tag>
            <vue-tag-item>{{ repo.namespace.name }}</vue-tag-item>
            <vue-tag-item class="detail">
              <vue-icon icon="call_split" />
              {{ repo.default_branch || "No initial" }}
            </vue-tag-item>
          </vue-tag>
          <vue-button
            small
            class="icon-button round flat r"
            icon-left="keyboard_arrow_right"
            @click="toDetail"
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
</template>

<script>
export default {
  name: 'Repo',
  props: ['repo'],
  methods: {
    toDetail() {
      this.$router.push({ name: 'repoDetail', params: { id: this.repo.id }, query: { branch: this.repo.default_branch } });
    },
  },
};
</script>
<style lang="scss" scoped>
.repo{
 padding: 0 10px 10px 10px;
}
.repo-card {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
  .content {
    padding: 15px;
  }
  .footer {
    padding: 10px 15px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }
}
</style>

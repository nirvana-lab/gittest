<template>
  <div class="task">
    <div class="task-card">
      <div class="content">
        <vue-button
          small
          class="icon-button round r"
          icon-left="keyboard_arrow_right"
          @click="toDetail"
          />
        <div class="b cp mb-5" @click="toDetail">{{ task.name }}</div>
        <div class="sm secondary">{{ task.last_activity_at | dateformat }}</div>
      </div>
      <div class="footer sm secondary">
        <span class="mr-5">Last Activity</span
        ><span>
          {{ task.last_activity_at | dateformat }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: ['task'],
  methods: {
    toDetail() {
      this.$router.push({ name: 'taskDetail', params: { id: this.task.id } });
    },
  },
};
</script>
<style lang="scss" scoped>
.task{
 padding: 0 10px 10px 10px;
}
.task-card {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
  .content {
    padding: 10px 15px;
  }
  .footer {
    padding: 10px 15px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }
}
</style>

<template>
  <div class="repo-task">
    <div class="clear repo-wrapper">
      <div class="g-sm-4 g-xs-6" v-for="task in tasks"  :key="task.name">
        <Task :task="task"/>
      </div>
    </div>
  </div>
</template>

<script>
import Task from '../components/repo-task/task.vue';

export default {
  name: 'RepoTask',
  components: {
    Task,
  },
  data() {
    return {
      tasks: [
        { name: 123 },
        { name: 3334 },
        { name: 4546 },
        { name: 5768 },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
</style>

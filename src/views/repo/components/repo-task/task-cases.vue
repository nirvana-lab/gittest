<template>
  <VueModal title="TestCases" @close="$emit('update:show', false)">
    <div class="body">
      <VueSelect
        v-model="path"
          button-class="white small"
          class="mr-5"
          placeholder="Path"
        >
          <VueSelectButton v-for="i in Object.keys(casesMap)" :key="i" :value="i" :label="i" />
        </VueSelect>
        <VueSelect
          v-model="method"
          button-class="white small"
          class="mr-5"
          placeholder="Method"
        >
          <VueSelectButton v-for="i in Object.keys(methodsMap)" :key="i" :value="i" :label="i" />
        </VueSelect>
         <nv-table odd>
          <col width="32px" />
          <col width="100%" />
      <thead>
      </thead>
      <tbody>
        <tr v-for="(value, index) in cases" :key="index">
          <td>
          </td>
          <td>
            {{value}}
          </td>
        </tr>
      </tbody>
    </nv-table>
    </div>
    <div slot="footer" class="actions">
      <div class="space"></div>
      <VueButton
        class="red round"
        @click="handleConfirm"
        >Confirm</VueButton
      >
      <VueButton class="flat round" @click="$emit('update:show', false)">Cancel</VueButton>
    </div>
  </VueModal>
</template>

<script>
export default {
  name: 'EnvCaseDialog',
  props: ['id'],
  data() {
    return {
      path: '',
      method: '',
    };
  },
  methods: {
    handleConfirm() {
      this.$emit('update:show', false);
    },
  },
  computed: {
    casesMap() {
      return this.$store.state.task.casesMap;
    },
    methodsMap() {
      return this.casesMap[this.path] || {};
    },
    repo() {
      return this.$store.state.repo.gitRepo;
    },
    cases() {
      if (!Object.keys(this.methodsMap).length) return [];
      return this.methodsMap[this.method];
    },
  },
  mounted() {
    const {
      file, ref,
    } = this.$route.query;
    const { id } = this.$route.params;
    if (file && id) {
      const params = { project_id: id, file_path: file, ref: ref || this.repo.default_branch };
      this.$store.dispatch('task/GET_ALL_TESTCASES', params);
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/colors.scss";
.body{
  padding: 0 24px;
}
.title {
  font-size: 13px;
  padding: 0 5px 5px;
  font-weight: 600;
  .name {
    vertical-align: text-bottom;
  }
}
</style>

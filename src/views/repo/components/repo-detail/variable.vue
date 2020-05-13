<template>
  <VueModal title="Global Variable" class="small" @close="$emit('update:show', false)">
    <div class="body">
      <table class="table odd mb-10">
        <col width="50px" />
        <col width="65%" />
        <col width="100%" />
        <col width="32px" />
        <thead>
          <tr>
            <th></th>
            <th>Key</th>
            <th>Value</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, index) in data" :key="index">
            <td>
              <vue-switch v-model="value.selected"/>
            </td>
            <td>
              <input type="text" class="input long small" v-model.trim="value.key">
              <!-- <vue-input v-model="value.key" class="db warning" small type="text" /> -->
            </td>
            <td>
              <input type="text" class="input long small" v-model.trim="value.value">
              <!-- <vue-input v-model="value.value" class="db warning" type="text" small /> -->
            </td>
            <td>
              <vue-button
                small
                @click="handleDelete(index)"
                class="icon-button round red flat"
                iconLeft="remove_circle"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <vue-button small class="icon-button round purple flat" @click="handleAdd" iconLeft="add_circle"/>
    </div>
    <div slot="footer" class="actions">
      <div class="space"></div>
      <VueButton
        class="purple round"
        @click="handleSave"
        :loading="loadingCreate"
        >Confirm</VueButton
      >
      <VueButton :disabled="loadingCreate" class="flat round" @click="$emit('update:show', false)">Cancel</VueButton>
    </div>
  </VueModal>
</template>

<script>
import * as testService from '@/services/testService';

export default {
  name: 'RepoVariable',
  data() {
    return {
      data: [],
      create: false,
      loadingCreate: false,
    };
  },
  watch: {
    current() {
      const result = [];
      Object.keys(this.variable.env).forEach((i) => {
        result.push({ key: i, ...this.variable.env[i] });
      });
      this.data = result;
    },
  },
  created() {
    testService.getVariable(this.$route.params.id).then(({ data }) => {
      const result = [];
      Object.keys(data.data.metadata).forEach((key) => {
        result.push({ key, ...data.data.metadata[key] });
      });
      this.data = result;
    });
  },
  methods: {
    handleSave() {
      const result = {};
      this.data.forEach((i) => {
        result[i.key] = { value: i.value, selected: i.selected };
      });
      testService.updateVariable(result, this.$route.params.id).then(() => {
        this.$emit('update:show', false);
      });
    },
    handleAdd() {
      this.data.push({ key: '', value: '', selected: true });
    },
    handleDelete(index) {
      this.data.splice(index, 1);
    },
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

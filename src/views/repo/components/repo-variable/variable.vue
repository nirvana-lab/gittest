<template>
  <div v-if="this.current">
     <div class="title">
      <vue-button small class="flat r" @click="handleSave" label="保存"/>
      <span class="name mr-5">Variable</span>
      <vue-button small class="icon-button round orange flat" @click="handleAdd" iconLeft="add_circle"/>
    </div>
    <table class="table odd">
      <col width="50px" />
      <col width="70%" />
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
            <vue-input v-model="value.key" class="db warning" small type="text" />
          </td>
          <td>
            <vue-input v-model="value.value" class="db warning" type="text" small />
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
  </div>
</template>

<script>
import * as testService from '@/services/testService';

export default {
  name: 'RepoVariable',
  data() {
    return {
      data: [],
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
  computed: {
    variable() {
      return this.$store.state.variable;
    },
    current() {
      return this.variable.current;
    },
  },
  methods: {
    handleSave() {
      const result = {};
      this.data.forEach((i) => {
        result[i.key] = { value: i.value, selected: i.selected };
      });
      testService.updateEnv(this.current, result);
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
.title {
  font-size: 13px;
  padding: 0 5px 5px;
  font-weight: 600;
  .name {
    vertical-align: text-bottom;
  }
}
.table th {
  padding: 0 7px;
  font-weight: 400;
  height: 30px;
  text-align: left;
  color: $vue-ui-grey-400;
}
.table td {
  height: 30px;
  padding: 0 3px;
  text-align: left;
}
.table {
  width: 100%;
  text-align: center;
  table-layout:fixed;
}
.table-wrapper {
  background-color: #fff;
  border-radius: 4px;
}
.odd > tbody > tr:nth-child(odd),
.even > tbody > tr:nth-child(even) {
  background-color: #eff4f9;
}

.table[class*="hover"] > tbody > tr:hover {
  background-color: #eee;
}
</style>

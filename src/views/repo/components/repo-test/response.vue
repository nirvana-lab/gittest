<template>
  <div>
    <div class="title">
      <span class="name mr-5">RESPONSE</span>
      <vue-button
        small
        class="icon-button round orange flat"
        iconLeft="add_circle"
        @click="handleAdd"
      />
    </div>
    <table class="table odd">
      <thead>
        <tr>
          <th>Key</th>
          <th>Type</th>
          <th>Expect</th>
          <th>Value</th>
          <th style="width: 18px"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in value" :key="index">
          <td>
            <vue-input
              class="db warning"
              small
              type="text"
              :value="i.key"
              @change="e => handleUpdate(index, 'key', e.target.value)"
            />
          </td>
          <td>
            <VueSelect
              :value="i.key_type"
              @update="e => handleUpdate(index, 'key_type', e)"
              button-class="flat"
            >
              <VueSelectButton value="integer" label="integer" />
              <VueSelectButton value="string" label="string" />
              <VueSelectButton value="boolean" label="boolean" />
            </VueSelect>
          </td>
          <td>
            <VueSelect
              :value="i.comparator"
              @update="e => handleUpdate(index, 'comparator', e)"
              button-class="flat"
            >
              <VueSelectButton value="less" label="less" />
              <VueSelectButton value="equal" label="equal" />
              <VueSelectButton value="more" label="more" />
            </VueSelect>
          </td>
          <td>
            <vue-input
              small
              class="db warning"
              type="text"
              :value="i.expect_value"
              @change="e => handleUpdate(index, 'expect_value', e.target.value)"
            />
          </td>
          <td style="width: 18px">
            <vue-button
              small
              @click="handleDelete"
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
export default {
  name: 'Response',
  props: {
    value: {
      default: () => [],
    },
  },
  methods: {
    handleUpdate(index, key, value) {
      const temp = [...this.value];
      temp[index][key] = value;
      this.$emit('input', temp);
    },
    handleAdd() {
      const temp = [...this.value];
      temp.push({
        key: '',
        key_type: 'string',
        comparator: 'comparator',
        expect_value: '',
      });
      this.$emit('input', temp);
    },
    handleDelete(index) {
      const temp = [...this.value];
      temp.splice(index, 1);
      this.$emit('input', temp);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/colors.scss";
.title {
  font-size: 12px;
  padding: 5px;
  font-weight: 600;
  border-style: solid;
  border-width: 1px 0 0;
  margin-top: 10px;
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
}
.odd > tbody > tr:nth-child(odd),
.even > tbody > tr:nth-child(even) {
  background-color: #eff4f9;
}

.table[class*="hover"] > tbody > tr:hover {
  background-color: #eee;
}
</style>

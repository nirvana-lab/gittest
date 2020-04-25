<template>
  <div>
    <div class="title">
      <span class="name mr-5">{{ title.toUpperCase() }}</span>
      <vue-button small class="icon-button round success flat" iconLeft="add" @click="handleAdd"/>
    </div>
    <table class="table">
      <tr v-for="(i,index) in value" :key="index">
        <td>
          <vue-input class="db" type="text" :value="i.name" @change="(e) => handleUpdate(index, 'name', e.target.value)"/>
        </td>
        <td>
          <VueSelect :value="i.type" @update="(e) => handleUpdate(index, 'type', e)" button-class="flat">
            <VueSelectButton value="integer" label="integer" />
            <VueSelectButton value="string" label="string" />
            <VueSelectButton value="boolean" label="boolean" />
          </VueSelect>
        </td>
        <td>
          <vue-input class="db" type="text" :value="i.assert" @change="(e) => handleUpdate(index, 'assert', e.target.value)" />
        </td>
        <td class="tc">
          <vue-button small @click="handleDelete" class="icon-button round danger flat" iconLeft="remove_circle" />
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: 'Params',
  props: {
    title: {
      default: '',
    },
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
        description: '',
        name: '',
        required: false,
        type: 'string',
        assert: '',
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
.title {
  font-size: 12px;
  padding: 5px 0;
  font-weight: 600;
  border-style: solid;
  border-width: 1px 0 0;
  margin-top: 15px;
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
.table{
  width: 100%;
}
</style>

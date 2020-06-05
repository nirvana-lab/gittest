<template>
  <div>
    <div class="title">
      <span class="name mr-5">SETUP</span>
    </div>
    <div>
      <input class="tag" v-for="(i, index) in value" @change="(e) => handleUpdate(index, e.target.value)" :key="index"/>
      <vue-button
        small
        class="icon-button round purple flat"
        iconLeft="add_circle"
        @click="handleAdd"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'setup',
  props: {
    value: {
      default: () => [],
    },
  },
  methods: {
    handleUpdate(index, value) {
      const temp = [...this.value];
      temp[index] = value;
      this.$emit('input', temp);
    },
    handleAdd() {
      const temp = [...this.value];
      temp.push({
        in: 'header',
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
@import "@/assets/styles/colors.scss";
.title {
  font-size: 13px;
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
.tag{
  border: 0;
  outline: none;
  background-color: #2d3444;
  color: #eee;
  padding: 2px;
  width: 60px;
  border-radius: 4px;
  margin-right: 5px;
}
</style>

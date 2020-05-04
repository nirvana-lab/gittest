<template>
  <div>
     <div class="title">
      <span class="name mr-5">Variable</span>
      <vue-button small class="icon-button round orange flat" iconLeft="add_circle" @click="handleAdd" />
    </div>
    <table class="table odd">
      <col width="50px" />
      <col width="70%" />
      <col width="100%" />
      <col width="32px" />
      <tbody>
        <tr>
          <td>
            <vue-switch />
          </td>
          <td>
            <vue-input class="db" small type="text" />
          </td>
          <td>
            <vue-input class="db" type="text" small />
          </td>
          <td>
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
  name: 'RepoVariable',
  watch: {
    $route(newRouter) {
      const { file, ref } = newRouter.query;
      const { id } = newRouter.params;
      if (file && ref && id) {
        this.$store.dispatch('repo/GET_FILE', {
          id,
          path: encodeURIComponent(file),
          ref,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/colors.scss";
.title {
  font-size: 12px;
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

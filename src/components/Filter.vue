<template>
  <select class="select" v-model="selected" @change="getFilter">
    <option disabled value="">select owner affiliations</option>
    <option>COMMON</option>
    <option>OWNER</option>
    <option>COLLABORATOR</option>
  </select>
</template>

<script>
export default {
  name: "Filter",

  data() {
    return {
      selected: ""
    }
  },

  methods: {
    getFilter() {
      this.$store.commit("changeFilter", this.selected);
    }
  }
}
</script>

<style scoped>
.select {
  margin: 0 24px;
  padding: 0 8px;
  width: 384px;
  height: 48px;
  font-size: 14px;
  line-height: 24px;
  border: 1px solid #3626A7;
  color: #3626A7;
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 4px 4px #ccc;
  outline: none;
}
</style>
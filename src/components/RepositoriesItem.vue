<template>
  <div class="item" @click="get">
    <a>{{ item }}</a>
  </div>
</template>

<script>
export default {
  name: "RepositoriesItem",
  props: ["item"],
  data() {
    return {
      name: ""
    }
  },

  methods: {
    getName(str) {
      const arr = str.split("/");
      this.name = arr[1];
    },

    get() {
      this.getName(this.item);
      this.$store.dispatch("getIssues", this.name);
    }

  }
}
</script>

<style scoped>
.item {
  display: block;
  font-weight: 400;
  font-size: 18px;
  line-height: 18px;
  margin-bottom: 18px;
}

.item a:hover {
  border-bottom: 2px solid #151515;
  cursor: pointer;
}
</style>
<template>
  <div class="issue-card" @click="get">
    <div class="title-card">{{ issue.title }}</div>
    <div class="text-card">{{ issue.bodyText ? issue.bodyText : defaultText }}</div>
    <div>Status issue: {{ issue.state }}</div>
  </div>
</template>

<script>
export default {
  name: "IssueCard",
  props: ["issue"],
  computed: {
    defaultText() {
      return ""
    },
    name() {
      return this.$store.getters.name
    }
  },

  methods: {
    get() {
      this.$store.dispatch("getComments", {
        name: this.name,
        number: this.issue.number,
      });
    }
  }
}
</script>

<style scoped>
.issue-card {
  margin-bottom: 24px;
  padding: 16px;
  background-color: #FFFFFF;
  border-radius: 6px;
  border: 1px solid #d0d7de;
  box-shadow: 0 3px 6px rgba(140, 149, 159, 0.15);
  cursor: pointer;
}

.title-card {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
}

.text-card {
  margin-bottom: 10px;
  line-height: 2;
}
</style>
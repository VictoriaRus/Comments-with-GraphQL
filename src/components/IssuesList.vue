<template>
  <div class="issue-list">
    <IssueCard v-for="issue in issues"
               :key="issue.number"
               :issue="issue"/>
  </div>
</template>

<script>
import IssueCard from "./IssueCard.vue";

export default {
  name: "IssuesList",
  components: { IssueCard },

  computed: {
    issues() {
      return this.$store.getters.issues
    }
  }
}
</script>

<style scoped>
.issue-list {
  padding: 0 14px 0 0;
}
</style>
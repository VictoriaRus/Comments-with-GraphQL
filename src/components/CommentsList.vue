<template>
  <div>
    <CommentCard
        v-for="(comment,index) in comments"
        :key="index"
        :comment="comment"
    />
  </div>
</template>

<script>
import CommentCard from "./CommentCard.vue";

export default {
  name: "CommentsList",
  components: { CommentCard },
  computed: {
    comments() {
      return this.$store.getters.comments
    }
  }
}
</script>

<style scoped>

</style>
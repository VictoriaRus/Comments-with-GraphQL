<template>
  <div class="comment">
    <div class="text-small">{{ comment.createdAt }}</div>
    <div>{{ comment.bodyText }}</div>
  </div>
</template>

<script>
export default {
  name: "CommentCard",
  props: ["comment"],
}
</script>

<style scoped>
.comment {
  margin-bottom: 16px;
}

.text-small {
  font-size: 12px;
  color: #656d76;
}
</style>
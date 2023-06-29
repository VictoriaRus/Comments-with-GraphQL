<template>
  <div>
    <RepositoriesItem
        v-for="repository in repositories"
        :key="repository.nameWithOwner"
        :item="repository.nameWithOwner"
    />
  </div>
</template>

<script>
import RepositoriesItem from "./RepositoriesItem.vue";

export default {
  name: "RepositoriesList",
  components: { RepositoriesItem },

  computed: {
    repositories() {
      return this.$store.getters.repositories
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <main class="window">
    <div class="sidebar scroll">
      <h5 class="title title-header">Repositories for login "octocat"</h5>
      <RepositoriesList v-if="repositories && !isLoading"/>
      <div v-if="isLoading">Loading...</div>
      <button class="button-link"
              v-if="repositories && !isLoading && hasNextPage"
              @click="showMoreRepositories">show more
      </button>
    </div>
    <div class="content">
      <div class="col-center">
        <div class="row">
          <div class="inner">
            <span class="secondary-title">Select filter</span>
            <Filter />
            <button class="button" @click="getRepositories">get repositories</button>
          </div>
        </div>
        <div class="container scroll">
          <IssuesList />
        </div>
      </div>
      <div class="col-right">
        <div class="title">Latest comments</div>
        <CommentsList />
      </div>
    </div>
  </main>
</template>

<script>
import RepositoriesList from "./components/RepositoriesList.vue";
import Filter from "./components/Filter.vue";
import IssuesList from "./components/IssuesList.vue";
import CommentsList from "./components/CommentsList.vue";

export default {
  components: { Filter, RepositoriesList, IssuesList, CommentsList },

  data() {
    return {
      isLoading: false,
      error: "",
    }
  },

  computed: {
    repositories() {
      return this.$store.getters.repositories
    },

    hasNextPage() {
      return this.$store.getters.hasNextPage
    },

    comments() {
      return this.$store.getters.comments
    }
  },

  methods: {
    getRepositories() {
      try {
        this.isLoading = true;
        this.$store.dispatch("getRepositories");
      } catch (e) {
        this.error = e;
      } finally {
        this.isLoading = false;
      }
    },

    showMoreRepositories() {
      try {
        this.isLoading = true;
        this.$store.dispatch("showMoreRepositories");
      } catch (e) {
        this.error = e;
      } finally {
        this.isLoading = false;
      }
    }
  },
}
</script>

<style scoped>
.window {
  height: 100vh;
  background-color: #f6f8fa;
  display: flex;
}

.sidebar {
  width: 24%;
  max-width: 500px;
  min-width: 340px;
  background-color: #FFFFFF;
  border-right: 1px solid #d0d7de;
  padding: 48px 24px 0;
  overflow: auto;
}

.content {
  display: flex;
  padding: 0 32px;
  width: 100%;
}

.row {
  display: flex;
  justify-content: flex-end;
  padding: 48px 0 14px;
  border-bottom: 1px solid #d0d7de;
  line-height: 48px;
}

.inner {
  display: flex;
  justify-content: space-between;
}

.secondary-title {
  font-weight: 600;
  font-size: 16px;
}

.container {
  margin-top: 24px;
  height: calc(100vh - 135px);
  overflow: auto;
}

.col-center {
  width: 100%;
  padding-right: 24px;
}

.col-right {
  width: 500px;
  padding: 48px 0 0 24px;
}

@media (max-width: 1600px) {
  .col-right {
    width: 420px;
  }
}
</style>
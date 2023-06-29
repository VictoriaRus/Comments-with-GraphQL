import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            token: "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",
            repositories: null,
            pageInfo: {
                hasNextPage: null,
                endCursor: null,
            },
            nameRepository: "",
            issues: null,
            comments: null,
            filter: null,
        }
    },

    getters: {
        repositories(state) {
            return state.repositories
        },
        hasNextPage(state) {
            return state.pageInfo.hasNextPage
        },
        issues(state) {
            return state.issues
        },
        name(state) {
            return state.nameRepository
        },
        comments(state) {
            return state.comments
        },
    },

    mutations: {
        changeFilter(state, payload) {
            state.filter = payload;
            state.repositories = null;
        },

        GET_REPOSITORIES(state, payload) {
            state.repositories = payload;
        },

        ADD_REPOSITORIES(state, payload) {
            state.repositories = [...state.repositories, ...payload];
        },

        GET_PAGE_INFO(state, payload) {
            state.pageInfo = payload;
        },

        GET_ISSUES(state, payload) {
            state.issues = payload;
        },

        CHANGE_NAME_REPOSITORY(state, payload) {
            state.nameRepository = payload;
        },

        GET_COMMENTS(state, payload) {
            state.comments = payload;
        },
    },

    actions: {
        getRepositories({ commit, state }) {
            try {
                fetch("https://api.github.com/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "bearer " + state.token,
                    },
                    body: JSON.stringify({
                        query: `{
                            user(login: "octocat") {
                              repositories(first: 20 ${ state.filter && state.filter !== "COMMON" ? ", ownerAffiliations: " + state.filter : "" }) {
                                nodes {
                                  nameWithOwner
                                }
                                pageInfo {
                                  hasNextPage
                                  endCursor
                                }
                                totalCount
                              }
                            }
                          }`
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        commit("GET_REPOSITORIES", data.data.user.repositories.nodes);
                        commit("GET_PAGE_INFO", {
                            hasNextPage: data.data.user.repositories.pageInfo.hasNextPage,
                            endCursor: data.data.user.repositories.pageInfo.endCursor,
                        })
                    })
            } catch (e) {
                console.log(e)
            }
        },

        showMoreRepositories({ commit, state }) {
            try {
                fetch("https://api.github.com/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "bearer " + state.token,
                    },
                    body: JSON.stringify({
                        query: `{
                            user(login: "octocat") {
                              repositories(first: 20 ${ state.filter && state.filter !== "COMMON" ? ", ownerAffiliations: " + state.filter : "" }, after: "${ state.pageInfo.endCursor }") {
                                nodes {
                                  nameWithOwner
                                }
                                pageInfo {
                                  hasNextPage
                                  endCursor
                                }
                                totalCount
                              }
                            }
                          }`
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        commit("ADD_REPOSITORIES", data.data.user.repositories.nodes);
                        commit("GET_PAGE_INFO", {
                            hasNextPage: data.data.user.repositories.pageInfo.hasNextPage,
                            endCursor: data.data.user.repositories.pageInfo.endCursor,
                        })
                    })
            } catch (e) {
                console.log(e)
            }
        },

        getIssues({ commit, state }, payload) {
            try {
                this.isLoading = true;
                fetch("https://api.github.com/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "bearer " + state.token,
                    },
                    body: JSON.stringify({
                        query: `{
                          user(login: "octocat") {
                            repository(name: "${ payload }") {
                              issues(first: 10) {
                                nodes {
                                  state
                                  title
                                  bodyText
                                  number
                                }
                              }
                            }
                          }
                        }`
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        commit("GET_ISSUES", data.data.user.repository.issues.nodes);
                        commit("CHANGE_NAME_REPOSITORY", payload);
                    })
            } catch (e) {
                console.log(e)
            }
        },

        getComments({ commit, state }, payload) {
            try {
                fetch("https://api.github.com/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "bearer " + state.token,
                    },
                    body: JSON.stringify({
                        query: `{
                          user(login: "octocat") {
                            repository(name: "${ payload.name }") {
                              issue(number: ${ payload.number }) {
                                comments(last: 10) {
                                  nodes {
                                    bodyText
                                    createdAt
                                  }
                                }
                              }
                            }
                          }
                        }`
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        commit("GET_COMMENTS", data.data.user.repository.issue.comments.nodes);
                    })
            } catch (e) {
                console.log(e)
            }
        },
    }
})

export default store;
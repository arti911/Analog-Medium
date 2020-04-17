import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import _ from 'lodash'

Vue.use(Vuex)

const usersURL = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    posts: [],
    pagePosts: [],
    role: null,
    userId: null,
    numberPost: null
  },
  getters: {
    countPost: state => state.posts.length
  },
  mutations: {
    SET_ROLE: (state, value) => {
      state.role = value
    },
    SET_USER_ID: (state, value) => {
      state.userId = value
    },
    EXIT: (state) => {
      state.role = null
      state.userId = null
    },
    LOAD_POSTS: (state, posts) => {
      state.posts = posts
      state.pagePosts = _.chunk(posts, 10)
    },
    SAVE_NUMBER_POST: (state, number) => {
      state.numberPost = number
    },
    LIKE_POST: (state, id) => {
      state.posts.find(post => {
        if (post.id === id) {
          post.claps += 1
        }
      })
      state.pagePosts = _.chunk(state.posts, 10)
    },
    DELETE_POST: (state, id) => {
      const index = state.posts.findIndex(post => post.id === id)
      state.posts.splice(index, 1)
      state.pagePosts = _.chunk(state.posts, 10)
    }
  },
  actions: {
    LOAD_POSTS: ({ commit }) => {
      axios.get(`${usersURL}/posts`)
        .then(({ data }) => {
          commit('LOAD_POSTS', data.reverse())
        })
    },
    PUBLISH_POST: ({ commit }, payload) => {
      return new Promise((resolve) => {
        axios.post(`${usersURL}/posts`, payload)
          .then(() => {
            resolve(true)
          })
      })
    },
    SAVE_EDIT_POST: (context, payload) => {
      if (typeof payload.id === 'number') {
        return new Promise((resolve, reject) => {
          axios.put(`${usersURL}/posts/${payload.id}`, payload)
            .then(res => resolve(res))
            .catch(err => reject(err))
        })
      }
    },
    DELETE_POST: ({ commit }, id) => {
      axios.delete(`${usersURL}/posts/${id}`)
        .then(() => {
          commit('DELETE_POST', id)
        })
    },
    LIKE_POST: ({ commit }, payload) => {
      axios.put(`${usersURL}/posts/${payload.id}`, payload)
    },
    LOGIN: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        const { email, password } = payload
        axios.get(`${usersURL}/users`)
          .then(({ data }) => {
            const checkLogin = data.find(user => user.login === email && user.password === password)
            if (checkLogin) {
              commit('SET_ROLE', checkLogin.role)
              commit('SET_USER_ID', checkLogin.id)
              resolve(true)
            } else {
              resolve(false)
            }
          })
          .catch(error => {
            console.log(1111)
            reject(error)
          })
      })
    },
    EXIT: ({ commit }) => {
      commit('EXIT')
    }
  },
  plugins: [createPersistedState()]
})

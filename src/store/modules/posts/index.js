import router from '@/router/'
import request from '@/utils/request'
import _ from 'lodash'

const usersURL = 'http://localhost:3000'

export default {
  state: {
    posts: [],
    pagePosts: [],
    numberPost: null
  },
  getters: {
    countPost: state => state.posts.length
  },
  mutations: {
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
      request(`${usersURL}/posts`)
        .then(res => commit('LOAD_POSTS', res.reverse()))
    },
    PUBLISH_POST: ({ commit }, payload) => {
      request(`${usersURL}/posts`, 'POST', payload)
        .then(() => router.push('/posts'))
    },
    SAVE_EDIT_POST: (context, payload) => {
      if (typeof payload.id === 'number') {
        request(`${usersURL}/posts/${payload.id}`, 'PUT', payload)
          .then(() => router.push('/posts'))
      }
    },
    DELETE_POST: ({ commit }, id) => {
      request(`${usersURL}/posts/${id}`, 'DELETE')
        .then(() => commit('DELETE_POST', id))
    },
    LIKE_POST: ({ commit }, payload) => {
      request(`${usersURL}/posts/${payload.id}`, 'PUT', payload)
    }
  }
}

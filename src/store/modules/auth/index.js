import router from '@/router/'
import request from '@/utils/request'

const usersURL = 'http://localhost:3000'

export default {
  state: {
    role: null,
    userId: null,
    errorAuth: false
  },
  mutations: {
    SET_ROLE: (state, value) => {
      state.role = value
    },
    SET_USER_ID: (state, value) => {
      state.userId = value
    },
    IS_ERROR: (state, value) => {
      state.errorAuth = value
    },
    EXIT: (state) => {
      state.role = null
      state.userId = null
    }
  },
  actions: {
    LOGIN: ({ commit }, payload) => {
      const { email, password } = payload
      request(`${usersURL}/users`)
        .then(res => {
          const checkLogin = res.find(user => user.login === email && user.password === password)
          if (checkLogin) {
            commit('SET_ROLE', checkLogin.role)
            commit('SET_USER_ID', checkLogin.id)
            router.push('/posts')
            commit('IS_ERROR', false)
          } else {
            commit('IS_ERROR', true)
          }
        })
        .catch(error => {
          this.error = error
        })
        .catch(error => {
          alert(Error, error.message)
        })
    },
    EXIT: ({ commit }) => {
      commit('EXIT')
    }
  }
}

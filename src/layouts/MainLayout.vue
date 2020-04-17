<template>
  <div class="main">
      <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <router-link to="/login" class="button is-primary is-outlined" v-if="!role">Войти</router-link>
                <router-link to="/create-post" class="button is-info" :disabled="hideBtn" v-if="role === 'writer'">Создать пост</router-link>
                <button class="button is-primary is-outlined" v-if="role === 'writer' || role === 'reader'" @click="exit">Выйти</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main class="hero is-fullheight">
        <router-view/>
      </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'role'
    ]),
    hideBtn () {
      return this.$route.path === '/create-post'
    }
  },
  methods: {
    exit () {
      this.$store.dispatch('EXIT')
      this.$router.push('/posts')
    }
  }
}
</script>

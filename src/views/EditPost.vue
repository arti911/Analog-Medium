<template>
  <div class="edit-post section">
    <section class="section">
      <div class="container">
        <form @submit.prevent="saveEdit">
          <b-field>
            <b-input v-model="posts[numberPost].title" placeholder="Заголовок"></b-input>
          </b-field>
          <b-field >
            <b-input v-model="posts[numberPost].description" type="textarea" placeholder="Напиши свой текст"></b-input>
          </b-field>
          <div class="buttons">
            <button @click="saveEdit(posts[numberPost])" class="button is-success" :disabled="posts[numberPost].title === '' || posts[numberPost].description === ''">Отредактировать</button>
            <router-link to="/posts" class="button is-light">Отменить</router-link>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'posts',
      'numberPost'
    ])
  },
  methods: {
    saveEdit (post) {
      this.$store.dispatch('SAVE_EDIT_POST', post)
        .then(success => {
          if (success) {
            this.$router.push('/posts')
          }
        })
    }
  }
}
</script>

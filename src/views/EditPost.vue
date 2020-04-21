<template>
  <div class="edit-post section">
    <section class="section">
      <div class="container">
        <form @submit.prevent="saveEdit(posts.posts[posts.numberPost])">
          <b-field>
            <b-input v-model="posts.posts[posts.numberPost].title" placeholder="Заголовок"></b-input>
          </b-field>
          <b-field >
            <b-input v-model="posts.posts[posts.numberPost].description" type="textarea" placeholder="Напиши свой текст"></b-input>
          </b-field>
          <div class="buttons">
            <button class="button is-success" :disabled="!disabledBtn">Отредактировать</button>
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
      'posts'
    ]),
    disabledBtn () {
      return this.posts.posts[this.posts.numberPost].title !== '' && this.posts.posts[this.posts.numberPost].description !== ''
    }
  },
  methods: {
    async saveEdit (post) {
      await this.$store.dispatch('SAVE_EDIT_POST', post)
    }
  }
}
</script>

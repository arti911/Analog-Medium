<template>
  <div class="create-post section">
    <section class="section">
      <div class="container">
        <b-field>
          <b-input v-model="title" placeholder="Заголовок"></b-input>
        </b-field>
        <b-field >
          <b-input v-model="description" type="textarea" placeholder="Напиши свой текст"></b-input>
        </b-field>
        <div class="buttons">
          <button class="button is-success" :disabled="title === '' || description === ''" @click="publishPost">Опубликовать</button>
          <router-link to="/posts" class="button is-light">Отменить</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    publishPost () {
      this.$store.dispatch('PUBLISH_POST', {
        title: this.title,
        description: this.description,
        claps: 0,
        createdAt: new Date(),
        updateAt: ''
      })
        .then(success => {
          if (success) {
            this.$router.push('/posts')
          }
        })
    }
  }
}
</script>

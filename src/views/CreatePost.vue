<template>
  <div class="create-post section">
    <section class="section">
      <div class="container">
        <form @submit.prevent="publishPost">
          <b-field>
            <b-input v-model="title" placeholder="Заголовок"></b-input>
          </b-field>
          <b-field >
            <b-input v-model="description" type="textarea" placeholder="Напиши свой текст"></b-input>
          </b-field>
          <div class="buttons">
            <button class="button is-success" :disabled="!disabledBtn" >Опубликовать</button>
            <router-link to="/posts" class="button is-light">Отменить</router-link>
          </div>
        </form>
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
  computed: {
    disabledBtn () {
      return this.title !== '' && this.description !== ''
    }
  },
  methods: {
    async publishPost () {
      await this.$store.dispatch('PUBLISH_POST', {
        title: this.title,
        description: this.description,
        claps: 0,
        createdAt: new Date(),
        updateAt: ''
      })
    }
  }
}
</script>

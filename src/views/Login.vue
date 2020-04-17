<template>
  <div class="container">
    <div class="login">
      <form class="login__form" @submit.prevent="login">
        <h1 class="title">Войти в систему</h1>
        <p v-if="error" class="error">Введенные адрес электронной почты и пароль не совпадают с сохраненными в нашей базе данных. Проверьте правильность введенных данных и повторите попытку.</p>
        <b-field label="Email">
          <b-input type="email" v-model="email" />
        </b-field>
        <b-field label="Password">
          <b-input type="password" v-model.number="password" />
        </b-field>
        <b-button class="is-fullwidth is-medium is-rounded is-info" @click.prevent="login" :disabled="email === '' || password === ''">Войти</b-button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      error: false
    }
  },
  methods: {
    login () {
      this.$store.dispatch('LOGIN', {
        email: this.email,
        password: this.password
      })
        .then(success => {
          success ? this.$router.push('/posts') : this.error = true
        })
        .catch(error => {
          this.error = error
        })
    }
  }
}
</script>

<style lang="scss">
$login: login;

.#{$login} {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;

  &__title {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 23px;
  }

  .field {
    &:last-of-type {
      margin-bottom: 24px;
    }
  }

  .label {
    text-align: left;
    color: #fff;
  }

  .error {
    margin-bottom: 10px;
    text-align: justify;
    color: red;
  }
}
</style>

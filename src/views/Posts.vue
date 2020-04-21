<template>
  <section class="hero is-fullheight section">
    <div class="section">
      <div class="container">
        <div class="cards" v-if="posts.posts.length" v-cloak>
          <div class="card" v-for="(post, index) in posts.pagePosts[current - 1]" :key="post.id">
            <div class="card-header">
              <div class="card-header-title">{{ post.title }}</div>
            </div>
            <div class="card-content">{{ post.description }}</div>
            <div class="card-footer">
              <div class="card-footer-item">
                <div>Дата публикации: {{ validDate(post.createdAt) }}</div>
                <div v-if="post.updateAt">Дата редактирования: {{ validDate(post.updateAt) }}</div>
              </div>
              <button class="like" @click="likePost(index, post.id)" v-if="auth.role === 'reader' || auth.role === null" :class="!auth.role ? 'disabled' : null">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -20 464 464" width="30px"><path d="m340 0c-44.773438.00390625-86.066406 24.164062-108 63.199219-21.933594-39.035157-63.226562-63.19531275-108-63.199219-68.480469 0-124 63.519531-124 132 0 172 232 292 232 292s232-120 232-292c0-68.480469-55.519531-132-124-132zm0 0" /><path d="m32 132c0-63.359375 47.550781-122.359375 108.894531-130.847656-5.597656-.769532-11.242187-1.15625025-16.894531-1.152344-68.480469 0-124 63.519531-124 132 0 172 232 292 232 292s6-3.113281 16-8.992188c-52.414062-30.824218-216-138.558593-216-283.007812zm0 0" /></svg>
                  {{ post.claps }}
                </span>
              </button>
              <div class="card-footer-item" v-if="auth.role === 'writer'">
                <div class="buttons">
                  <button class="button is-success" @click="editPost(index)">Редактировать</button>
                  <button class="button is-danger" @click="deletePost(post.id)">Удалить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="title" v-else>Постов {{posts.posts.length}}</div>
        <b-pagination
          :total="posts.posts.length"
          :per-page="perPage"
          :current.sync="current"
          :order="order"
          :size="size"
          :simple="isSimple"
          v-if="posts.posts.length > perPage"
        />
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      perPage: 10,
      current: 1,
      order: 'is-centered',
      size: 'is-medium',
      isSimple: true
    }
  },
  async mounted () {
    await this.getPosts()
  },
  computed: {
    ...mapState([
      'posts',
      'auth'
    ]),
    countPost () {
      return this.$store.posts.getters.countPost
    }
  },
  methods: {
    getPosts () {
      this.$store.dispatch('LOAD_POSTS')
    },
    async deletePost (id) {
      await this.$store.dispatch('DELETE_POST', id)
    },
    editPost (index) {
      this.$store.commit('SAVE_NUMBER_POST', index)
      this.$router.push('/edit')
    },
    likePost (index, id) {
      this.$store.commit('LIKE_POST', id)
      this.$store.dispatch('LIKE_POST', this.$store.state.posts.posts[index])
    },
    validDate (date) {
      return moment(date).format('D.MM.YYYY H:mm:ss')
    }
  }
}
</script>

<style lang="scss">
[v-cloak] {
  display: none;
}

.cards {
  margin-bottom: 50px;
}

.card {
  margin-bottom: 35px;
}

.like {
  padding: 15px;
  background-color: transparent;
  border: 0;
  outline: 0;
  font-size: 20px;
  color: #ff5023;

  span {
    display: flex;
    align-items: center;
  }

  svg {
    fill: #ff6243;
    margin: 0 5px;
  }

  &.disabled {
    pointer-events: none;
    cursor: not-allowed;
    color: lightgray;

    svg {
      fill: lightgrey
    }
  }
}
</style>

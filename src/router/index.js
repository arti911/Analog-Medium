import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Posts from '../views/Posts.vue'
import Login from '../views/Login.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/posts'
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'auth',
      auth: true
    },
    component: Login
  },
  {
    path: '/posts',
    name: 'Posts',
    meta: {
      layout: 'main',
      author: false
    },
    component: Posts
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    meta: {
      layout: 'main',
      author: true
    },
    component: () => import('../views/CreatePost.vue')
  },
  {
    path: '/edit',
    name: 'EditPost',
    meta: {
      layout: 'main',
      author: true
    },
    component: () => import('../views/EditPost.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const roleUser = store.state.role
  const requireAuthor = to.matched.some(item => item.meta.author)
  const requireAuth = to.matched.some(item => item.meta.auth)

  if (roleUser && requireAuth) {
    next('/posts')
  } else if (requireAuthor && roleUser !== 'writer') {
    next('/posts')
  } else {
    next()
  }
})

export default router

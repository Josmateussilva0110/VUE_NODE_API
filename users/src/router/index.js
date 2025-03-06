import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '../views/RegisterView.vue'
import Login from '../views/LoginView.vue'
import Users from '../views/Users.vue'
import EditView from '../views/EditView.vue'
import axios from 'axios'

function AdminAuth(to, from, next) {
  if(localStorage.getItem('token') != undefined) {
    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }

    axios.post("http://localhost:8086/validate", {}, req).then(response => {
      console.log(response)
      next()

    }).catch(err => {
      console.log('erro em validate: ',err.response)
      next('/login')
    })
  }
  else {
    next('/login')
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/register',
    name: 'Register',
    component: Register
  },

  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/admin/users',
    name: 'users',
    component: Users,
    beforeEnter: AdminAuth
  },

  {
    path: '/admin/edit/user/:id',
    name: 'editUser',
    component: EditView,
    beforeEnter: AdminAuth
  },


  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router


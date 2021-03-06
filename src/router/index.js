import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Article from '@/views/article'
import Publish from '@/views/publish'
import Image from '@/views/image'
import Settings from '@/views/settings'


Vue.use(VueRouter)

const routes = [
  {
    path:"/login",
    name:'login',
    component:Login
  },
  {
    path:'/',
    component:Layout,
    children:[
      {
        path:'',
        name:'home',
        component:Home
      },
      {
        path:'article',
        name:'article',
        component:Article
      },
      {
        path:'publish',
        name:'publish',
        component:Publish
      },
      {
        path:'image',
        name:'image',
        component:Image
      },
      {
        path:'settings',
        name:'settings',
        component:Settings
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
 
  if(to.path == '/login'){
    next()
  }else{
    const user = JSON.parse(window.localStorage.getItem('user'))
    if(user){
      next()
    }else{
      next('/login')
    }
  }
})

export default router

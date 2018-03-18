import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/frontEnd/Home'
import OnlineClass from '@/components/frontEnd/OnlineClass'
import Community from '@/components/frontEnd/Community'
//import HelloWorld from '@/components/HelloWorld'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/OnlineClass',
      name: 'OnlineClass',
      component: OnlineClass
    },
    {
      path: '/Community',
      name: 'Community',
      component: Community
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/frontEnd/Home'
import Document from '@/components/frontEnd/Document'
import OnlineClass from '@/components/frontEnd/OnlineClass'
import Community from '@/components/frontEnd/Community'
import Content from '@/components/frontEnd/Content'
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
      path: '/Document',
      name: 'Document',
      component: Document
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
    },
    {
      path: '/Topic/:id',
      name: 'Topic',
      component: Content
    }
  ]
})

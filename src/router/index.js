import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/frontEnd/Home'
import Document from '@/components/frontEnd/Document'
import OnlineClass from '@/components/frontEnd/OnlineClass'
import Community from '@/components/frontEnd/Community'
import Content from '@/components/frontEnd/Content'
import Dashboard from '@/components/backEnd/Dashboard'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard
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
      path: '/Content/:id',
      name: 'Content',
      component: Content
    }
  ]
})

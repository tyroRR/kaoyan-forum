import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/frontEnd/Home'
import Document from '@/components/frontEnd/Document'
import OnlineClass from '@/components/frontEnd/OnlineClass'
import Community from '@/components/frontEnd/Community'
import Content from '@/components/frontEnd/Content'
import Dashboard from '@/components/backEnd/Dashboard'
import UserList from '@/components/backEnd/UserList'
import InfoList from '@/components/backEnd/InfoList'
import TopicList from '@/components/backEnd/TopicList'
import DocList from '@/components/backEnd/DocList'
import LessonList from '@/components/backEnd/LessonList'

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
      path: '/Content/:id',
      name: 'Content',
      component: Content
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/',
      component: Dashboard,
      meta: { role: 'admin' },
      iconCls: 'iconfont icon-accountfilling',
      leaf: true,
      menuShow: true,
      children: [
        {path: '/Dashboard/userList', component: UserList, name: '用户管理', menuShow: true},
      ]
    },
    {
      path: '/',
      component: Dashboard,
      meta: { role: 'admin' },
      iconCls: 'iconfont icon-form',
      leaf: true,
      menuShow: true,
      children: [
        {path: '/Dashboard/infoList', component: InfoList, name: '信息管理', menuShow: true},
      ]
    },
    {
      path: '/',
      component: Dashboard,
      meta: { role: 'admin' },
      iconCls: 'iconfont icon-form',
      leaf: true,
      menuShow: true,
      children: [
        {path: '/Dashboard/topicList', component: TopicList, name: '帖子管理', menuShow: true},
      ]
    },
    {
      path: '/',
      component: Dashboard,
      meta: { role: 'admin' },
      iconCls: 'iconfont icon-folder',
      leaf: true,
      menuShow: true,
      children: [
        {path: '/Dashboard/docList', component: DocList, name: '资料管理', menuShow: true},
      ]
    },
    {
      path: '/',
      component: Dashboard,
      meta: { role: 'admin' },
      iconCls: 'iconfont icon-folder',
      leaf: true,
      menuShow: true,
      children: [
        {path: '/Dashboard/LessonList', component: LessonList, name: '课程管理', menuShow: true},
      ]
    }
  ]
})

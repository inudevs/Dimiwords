import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '@/components/Index'
import Words from '@/components/Words'
import Wordbooks from '@/components/Books'
import TestEnglish from '@/components/TestEn'
import TestKorean from '@/components/TestKo'
import Learn from '@/components/Learn'
import New from '@/components/New'
import Login from '@/components/Login'
import Join from '@/components/Join'
import Rank from '@/components/Rank'

import '../assets/css/style.css'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/view/words',
      name: 'words',
      component: Words
    },
    {
      path: '/view/wordbooks',
      name: 'wordbooks',
      component: Wordbooks
    },
    {
      path: '/test/english/:id',
      name: 'test_en',
      component: TestEnglish
    },
    {
      path: '/test/korean/:id',
      name: 'test_ko',
      component: TestKorean
    },
    {
      path: '/learn/:id',
      name: 'learn',
      component: Learn
    },
    {
      path: '/new/wordbook',
      name: 'new_wordbook',
      component: New
    },
    {
      path: '/user/login',
      name: 'login',
      component: Login
    },
    {
      path: '/user/join',
      name: 'join',
      component: Join
    },
    {
      path: '/user/rank',
      name: 'rank',
      component: Rank
    }
  ]
})

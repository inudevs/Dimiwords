import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Show from '@/components/Show'
import NewWord from '@/components/NewWord'
import Login from '@/components/Login'
import Join from '@/components/Join'
import '../assets/css/style.css'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/:id',
            name: 'show',
            component: Show
        },
        {
            path: '/new/wordbook',
            name: 'new_wordbook',
            component: NewWord
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
        }
    ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Show from '@/components/Show'
import New from '@/components/New'
import Login from '@/components/Login'
import Join from '@/components/Join'
import Rank from '@/components/Rank'
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

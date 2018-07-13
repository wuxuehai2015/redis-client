import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'landing-page',
            component: require('@/components/Main').default
        },
        {
            path: '/add-db',
            name: 'add-db',
            component: require('@/components/Db/AddDb').default
        },
        {
            path: '/db',
            name: 'db',
            component: require('@/components/Db/Record').default,
            props: true
        },
    ]
})

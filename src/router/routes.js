import Search from '@/views/Search'
export default [
    {
        path:'*',
        redirect:'/home/classify'
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ "@/views/Home"),
        children: [
            {
                path: 'classify',
                name: 'Classify',
                component: () => import(/* webpackChunkName: "classify" */ "@/views/Classify"),
            },
            {
                path: 'shopping',
                name: 'Shopping',
                component: () => import(/* webpackChunkName: "shopping" */ "@/views/Shopping"),
            }
        ]
    },
    {
        path: '/search',
        name: 'Search',
        component: Search
    }
]
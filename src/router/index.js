import Vue from 'vue'
import Router from 'vue-router'

import CityPicker from '@/views/citypicker/CityPicker'
import Home from '@/views/home/Home'
import Movies from '@/views/home/movies/Movies'
import inTheaters from '@/views/home/movies/inTheaters'
import ComingSoon from '@/views/home/movies/ComingSoon'
import Theaters from '@/views/home/movies/Theaters'
import ClasicMovie from '@/views/home/movies/ClasicMovie'
import Profile from '@/views/home/profile/Profile'
import Video from '@/views/home/video/Video'
import Perform from '@/views/home/video/Video'
import MiniVideo from '@/views/home/minivideo/MiniVideo'

Vue.use(Router)

const routes = [
    {
        path:'/',
        redirect:'/home',
    },
    {
        path:'/home',
        name:'home',
        component:Home,
        redirect:'/home/movies',
        children:[
            {
                path:'movies',
                name:'movies',
                component:Movies,
                redirect:'/home/movies/intheaters',
                children:[
                    {
                        path: 'intheaters',
                        name: 'intheaters',
                        component:inTheaters,
                    },
                    {
                        path: 'comingsoon',
                        name: 'comingsoon',
                        component : ComingSoon
                    },
                    {
                        path: 'clasicmovie',
                        name: 'clasicmovie',
                        component : ClasicMovie
                    },
                    {
                        path: 'theaters',
                        name: 'theaters',
                        component : Theaters
                    },
                ]
            },
            {
                path:'minivideo',
                name:'minivideo',
                component:MiniVideo,
            },
            {
                path:'perform',
                name:'perform',
                component:Perform,
            },
            {
                path:'video',
                name:'video',
                component:Video,
            },
            {
                path:'profile',
                name:'profile',
                component:Profile,
            },

        ]
    },
    {
        path:'/citypicker',
        name: 'citypicker',
        component: CityPicker,
    },
]
const router = new Router({
    mode:'history',
    routes,
})
export default router
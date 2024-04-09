import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import User from "../views/User.vue";
import Anime from "../views/Anime.vue";
import AnimeDescription from "../views/AnimeDescription.vue";
import List from "../views/List.vue";
import ListDescription from "../views/ListDescription.vue";
import Not_Found from "../views/404.vue";


const routes = [    
    {
       path: "/",
       name: "Main",
       component: Main,
       meta: {
           title: 'Home'
       }
    },
    {
        path: "/Login",
        name: "login",
        component: Login,
        meta: {
            title: 'Login'
        }
    },
    {
        path: "/Register",
        name: "register",
        component: Register,
        meta: {
            title: 'Register'
        }
    },
    {
        path: "/Profile",
        name: "profile",
        component: Profile,
        meta: {
            title: 'Profile'
        }
    },
    {
        path: "/User/:id",
        name: "user",
        component: User,
        meta: {
            title: 'User'
        }
    },
    {
        path: "/Anime",
        name: "anime",
        component: Anime,
        meta: {
            title: 'Anime'
        }
    },
    {
        path: "/AnimeDescription/:id",
        name: "animeDescription",
        component: AnimeDescription,
        meta: {
            title: 'AnimeDescription'
        }
    },
    {
        path: "/List",
        name: "list",
        component: List,
        meta: {
            title: 'List'
        }
    },
    {
        path: "/ListDescription/:id",
        name: "listDescription",
        component: ListDescription,
        meta: {
            title: 'ListDescription'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: "Not_Found",
        component: Not_Found,
        meta:{
          title: '404'
        }
    
      }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | Event`;
    next();
});

export default router;
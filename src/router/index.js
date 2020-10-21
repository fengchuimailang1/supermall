import vue from "vue"
import Router from "vue-router"

vue.use(Router)

const Home = () => import("views/home/Home.vue")
const Category = () => import("views/category/Category.vue")
const Cart = () => import("views/cart/Cart.vue")
const Profile = () => import("views/profile/Profile.vue")
const Detail = () => import("views/detail/Detail.vue")


const routes = [
    {
        path:"",
        redirect:"/home"
      },
      {
        path:"/home",
        component: Home
      },
      {
        path:"/category",
        component: Category
      },
      {
        path:"/cart",
        component: Cart
      },
      {
        path:"/profile",
        component: Profile
      },
      {
        path:"/detail/:iid",
        component: Detail,
        props:true
      }
]

const router = new Router({
    routes,
    mode:"history"
})

export default router
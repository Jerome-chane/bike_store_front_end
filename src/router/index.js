import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Bikes from "../components/Bikes.vue";
import Rentals from "../components/Rentals.vue";
import MyRentals from "../components/MyRentals.vue";
import Terms from "../components/Terms.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/bikes",
    name: "Bikes",
    component: Bikes
  },
  {
    path: "/rentals",
    name: "Rentals",
    component: Rentals
  },
  {
    path: "/terms-and-conditions",
    name: "Terms",
    component: Terms
  },
  {
    path: "/my-rentals",
    name: "MyRentals",
    component: MyRentals
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

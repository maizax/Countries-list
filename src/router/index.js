import Countries from "../components/Countries.vue";
import Cities from "../components/Cities.vue";
import Vue from "vue";
import Router from "vue-router";


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Countries,
      name: "Home"
    },
    {
      path: "/Cities/:id",
      component: Cities,
      name: "Cities"
    }
  ],
  mode: "history"
});

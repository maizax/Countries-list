import Countries from "../components/CountriesList.vue";
import Cities from "../components/CitiesList.vue";
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

import { createApp } from "vue";
import "./assets/global.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/home/home.vue";
import Edit from "./components/edit/edit.vue";
import SelectTraining from "./components/select-training/select-training.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/nihongo-wo-renshuushimasu/", name: "Home", component: Home },
    { path: "/nihongo-wo-renshuushimasu/edit", name: "Edit", component: Edit },
    {
      path: "/nihongo-wo-renshuushimasu/training",
      name: "Training",
      component: SelectTraining,
    },
  ],
});

const app = createApp(App);

app.use(router).mount("#app");

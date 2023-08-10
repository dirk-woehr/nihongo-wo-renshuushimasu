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
    { path: "/", name: "Home", component: Home },
    { path: "/edit", name: "Edit", component: Edit },
    { path: "/training", name: "Training", component: SelectTraining },
  ],
});

createApp(App).use(router).mount("#app");

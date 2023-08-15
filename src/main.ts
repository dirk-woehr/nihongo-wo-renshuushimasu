import { createApp } from "vue";
import "./assets/global.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/home/home.vue";
import Edit from "./components/edit/edit.vue";
import SelectTraining from "./components/select-training/select-training.vue";
import Toast, { PluginOptions, POSITION } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
const toastOptions: PluginOptions = {
  position: POSITION.TOP_CENTER,
  timeout: 1500,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
};

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

app.use(router).use(Toast, toastOptions).mount("#app");

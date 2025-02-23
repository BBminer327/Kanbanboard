import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Board from "../components/Board.vue";
import store from "../store";

const routes = [
  { path: "/", component: Login },
  { 
    path: "/board", 
    component: Board,
    beforeEnter: (to, from, next) => {
      if (!store.state.currentUser) { 
        next("/");
      } else {
        next();
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

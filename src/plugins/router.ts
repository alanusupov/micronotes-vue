import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../pages/Main.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/shared",
    name: "shared",
    component: () => import("../pages/Shared.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/Login.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/notes",
    name: "notes",
    component: () => import("../pages/Notes.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../pages/Register.vue"),
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("token") !== null) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;

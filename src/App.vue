<script setup lang="ts">
// import { ref } from "vue";
import { useRouter } from "vue-router";
import Nav from "./components/Nav.vue";
import "./helpers/axios";
import { ref } from "vue";
import AxiosInstance from "./helpers/axios";
// const counter = ref(0);

const router = useRouter();
// let isLoggedin = !!localStorage.getItem("token");
// console.log(isLoggedin);

let isLoggedin = ref(!!localStorage.getItem("token"));
// watch(isLoggedin, (isLoggedin: boolean, prev) => {
//   console.log(isLoggedin);
//   isLoggedin = !prev;
// });

const logoutUser = async function () {
  localStorage.removeItem("token");
  isLoggedin.value = false;
  console.log("logout");
  router.push("/login");
};

const handleLogin = function () {
  AxiosInstance.defaults.headers.common["x-access-token"] =
    localStorage.getItem("token");
  isLoggedin.value = true;
};
</script>

<template>
  <Nav :logoutUser="logoutUser" :isLoggedin="isLoggedin"></Nav>
  <RouterView :handleLogin="handleLogin" :isLoggedin="isLoggedin" />
  <!-- <h1 class="title">Hello {{ counter }}</h1>
  <button @click="counter++" class="btn">Counter Add</button>
  <button @click="counter--" class="btn">Counter Mainus</button> -->
</template>

<style></style>

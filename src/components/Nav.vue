<template lang="">
  <nav class="nav">
    <h2 class="nav-title"><RouterLink to="/">Notes</RouterLink></h2>
    <ul class="nav-list">
      <li v-if="!isLoggedin" class="nav-list__item">
        <RouterLink to="/login">login</RouterLink>
      </li>
      <li v-if="!isLoggedin" class="nav-list__item">
        <RouterLink to="/register">Register</RouterLink>
      </li>
      <li v-if="isLoggedin" @click="logoutUser()" class="nav-list__item">
        <RouterLink to="/">Logout</RouterLink>
      </li>
      <li class="nav-list__item">
        <RouterLink to="/shared">Shared</RouterLink>
      </li>
      <li class="nav-list__item">
        <RouterLink to="/notes">Notes</RouterLink>
      </li>
    </ul>
  </nav>
</template>
<script setup>
import { useRouter } from "vue-router";

const props = defineProps(["isLoggedin", "logoutUser"]);
const router = useRouter();
// export default {
//   name: "Nav",
// };
// const logoutUser = async function () {
//   localStorage.removeItem("token");
//   isLoggedin = false;
//   console.log("logout");
//   router.push("/login");
// };
console.log(props);
</script>
<style>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  background: #3facb0;
}
.nav-title {
  font-weight: bold;
  font-size: 26px;
}
.nav-title a {
  color: white;
  text-decoration: none;
}

.nav-list {
  display: flex;
  list-style-type: none;
  gap: 15px;
  justify-content: center;
}
.nav-list__item a {
  color: white;
  text-transform: uppercase;
  font-size: 18px;
  text-decoration: none;
}

.nav-list__item a:hover {
  transition: 1s;
  color: aqua;
}
</style>

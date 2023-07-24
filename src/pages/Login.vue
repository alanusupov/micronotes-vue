<template lang="">
  <div class="login">
    <h2 class="login-title">Sign In</h2>

    <form @submit.prevent="onSubmit" action="" class="login-form">
      <div class="login-form__input">
        <label for="username">Username</label>
        <input
          id="username"
          required
          type="text"
          v-model="username"
          name="username"
          placeholder="Username"
        />
      </div>
      <div class="login-form__input">
        <label for="password">Password</label>
        <input
          required
          id="password"
          type="password"
          v-model="password"
          name="password"
          placeholder="Password"
        />
      </div>
      <button
        @click="
          {
            onSubmitLogin();
          }
        "
        type="submit"
        class="login-form__btn"
      >
        Login
      </button>
      <div class="register-bottom">
        Don't have an account?
        <router-link to="/register">Sign up here!</router-link>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import defaultUrl from "../helpers/constants";
import { useRouter } from "vue-router";
import AxiosInstance from "../helpers/axios";
const router = useRouter();
const props = defineProps(["handleLogin"]);
const username = ref("");
const password = ref("");
async function onSubmitLogin() {
  console.log(username.value, password.value);
  if (username.value && password.value) {
    try {
      const res = await axios.post(defaultUrl + "user/login/", {
        login: username.value,
        password: password.value,
      });
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      onLoginSuccess(res.data.token);

      router.push("/notes");
      props.handleLogin();
    } catch (error) {}
  }
}

function onLoginSuccess(newToken) {
  console.log("New Token:", newToken);
  axios.defaults.headers.common["x-access-token"] = newToken;
  AxiosInstance.defaults.headers.common["x-access-token"] = newToken;
}
</script>
<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.login-title {
  color: #000;
  text-align: center;
  text-transform: uppercase;
  font-size: 30px;
}
.login-form {
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  background: #007ac1;
  border-radius: 10px;
  padding: 20px;
  margin-top: 10px;
  gap: 20px;
}
.login-form__input {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}
.login-form__input input {
  padding: 10px;
  background: #ffffff;
  border: none;
  border-radius: 10px;
}
.login-form__input label {
  padding: 10px;
  color: white;
}

.login-form__btn {
  border: none;
  font-size: 16px;
  padding: 10px;
  border-radius: 10px;
  background: #dfdfdf;
  color: black;
  border: 1px solid black;
}
.register-bottom {
  font-size: 13px;
  color: rgb(222, 222, 222);
}
</style>

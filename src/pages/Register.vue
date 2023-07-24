<template lang="">
  <div class="register">
    <h2 class="register-title">Sign Up</h2>
    <form @submit.prevent="onSubmit" action="" class="register-form">
      <div class="register-form__input">
        <label for="username">Username</label>
        <input
          id="username"
          type="text"
          required="true"
          v-model="username"
          name="username"
          placeholder="Username"
        />
      </div>
      <div class="register-form__input">
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
            onSubmitRegisterForm();
          }
        "
        type="submit"
        class="register-form__btn"
      >
        Register
      </button>
      <div class="register-bottom">
        Already have an account?
        <router-link to="/login">Login here!</router-link>
      </div>
    </form>
  </div>
</template>
<script setup>
import defaultUrl from "../helpers/constants";
import { ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
const username = ref("");
const password = ref("");
const router = useRouter();
// const route = useRoute();

async function onSubmitRegisterForm() {
  if (username.value && password.value) {
    try {
      const res = await axios.post(defaultUrl + "user/register", {
        login: username.value,
        password: password.value,
      });
      console.log(res.data);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("you must enter the pass and login");
  }
  // console.log( username.value, password.value);
}
</script>
<style scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.register-title {
  color: #000;
  text-align: center;
  text-transform: uppercase;
  font-size: 30px;
}
.register-bottom {
  font-size: 13px;
}
.register-form {
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

.register-login {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.register-form__input {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}
.register-form__input input {
  padding: 10px;
  background: #ffffff;
  border: none;
  border-radius: 10px;
}
.register-form__input label {
  padding: 10px;
  color: white;
}

.register-form__btn {
  border: none;
  font-size: 16px;
  padding: 10px;
  border-radius: 10px;
  background: #dfdfdf;
  color: black;
  border: 1px solid black;
}
</style>

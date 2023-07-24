<template lang="">
  <div>
    <h2 class="notes-title">SEARCH FOR SHARED NOTES</h2>
    <form @submit.prevent="getSharedNote" class="notes-form">
      <input
        v-model="inputValue"
        placeholder="Shared Id"
        type="text"
        class="notes-input"
      />
      <button type="sumbit" class="notes-btn">Create Note</button>
    </form>

    <div class="notes-error">
      {{ errormsg }}
    </div>
    <div v-if="sharedNote?.text" class="notes-list__item">
      <div>{{ sharedNote.text }}</div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { getSharedNoteApi } from "../api/notesApi";
const inputValue = ref("");
const sharedNote = ref({});
const errormsg = ref("");
const getSharedNote = async () => {
  errormsg.value = "";
  try {
    const res = await getSharedNoteApi(inputValue.value);
    sharedNote.value = res.note;
    console.log(res);
    if (!res) {
      errormsg.value = "Not Found";
    }
  } catch (error) {
    errormsg.value = res;
  }
};
</script>
<style scoped>
.notes-title {
  text-align: center;
}
.notes-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.notes-input {
  min-width: 200px;
  padding: 15px;
  border-radius: 10px;
  border: none;
}
.notes-btn {
  border: none;
  border-radius: 10px;
  font-size: 18px;
  background: #2dbde8;
  padding: 10px;
  color: white;
  margin-top: 10px;
}
.notes-btn:hover {
  background: #29abd2;
  transition: 0.5s;
}
.notes-list__item {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 10px;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 20px;
}
.notes-error {
  text-align: center;
  margin-top: 10px;
}
</style>

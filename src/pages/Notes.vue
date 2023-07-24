<template lang="">
  <Suspense>
    <template #default>
      <div class="notes">
        <h2 class="notes-title">Notes</h2>
        <h3 class="notes-title">CREATE A NOTE</h3>
        <form @submit.prevent="addNote" class="notes-form">
          <input
            v-model="inputText"
            placeholder="Note Text"
            type="text"
            class="notes-input"
          />
          <button type="sumbit" class="notes-btn">Create Note</button>
        </form>

        <ul class="notes-list">
          <li v-for="note in notes" class="notes-list__item">
            <div v-if="isEdit !== note.id">{{ note.text }}</div>
            <input
              v-model="editInputVal"
              class="note-list__edit-input"
              v-if="isEdit === note.id"
              type="text"
            />
            <div class="notes-list__item-sharewrap">
              <div>
                <button
                  v-if="!note.shareId"
                  @click="shareNote(note.id)"
                  class="notes-list__item-share"
                >
                  Share
                </button>
                <button
                  v-if="isEdit !== note.id"
                  @click="setEdit(note.id, note.text)"
                  class="notes-list__item-edit"
                >
                  Edit
                </button>
                <button
                  v-if="isEdit === note.id"
                  class="notes-list__item-edit"
                  @click="saveEdit(note.id, note.text)"
                >
                  Save
                </button>
                <button
                  @click="deleteNote(note.id)"
                  class="notes-list__item-delete"
                >
                  Delete
                </button>
              </div>
              <p v-if="note.shareId" class="note-list__item-sharetext">
                {{ note.shareId }}
              </p>
            </div>
          </li>
        </ul>
        <div class="notes-pagination">
          <button
            @click="paginateVal = paginateVal - 10"
            :disabled="paginateVal === 0"
            class="notes-pagiantion__btn"
          >
            Prev
          </button>
          <button
            :disabled="totalNoteCount <= paginateVal + 10"
            @click="paginateVal = paginateVal + 10"
            class="notes-pagiantion__btn"
          >
            Next
          </button>
        </div>
      </div>
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import {
  addNoteApi,
  deleteNoteApi,
  getNotesApi,
  editNoteApi,
  shareNoteApi,
} from "../api/notesApi";
import axios from "axios";
import defaultUrl from "../helpers/constants";
const inputText = ref("");
const notes = ref([]);
const isEdit = ref("");
const editInputVal = ref("");
const paginateVal = ref(0);
const totalNoteCount = ref(0);
const addNote = async () => {
  try {
    const res = await addNoteApi(inputText.value);
    if (res) {
      inputText.value = "";
      await getNotes();
    }
  } catch (error) {
    console.log(error);
  }
};

const getNotes = async () => {
  const notesFromApi = await getNotesApi(paginateVal.value);
  notes.value = notesFromApi.notes;
  totalNoteCount.value = notesFromApi.totalNotes;
  console.log(notes.value);
};

const deleteNote = async id => {
  const res = await deleteNoteApi(id);
  if (res) {
    getNotes();
  }
};
const setEdit = (id, text) => {
  if (id !== isEdit.value) {
    editInputVal.value = text;
    isEdit.value = id;
  }
};

const saveEdit = async (id, text) => {
  if (editInputVal.value === text) return;
  const res = await editNoteApi(id, editInputVal.value);
  if (res) {
    getNotes();
    isEdit.value = 0;
    editInputVal.value = "";
  }
};
const shareNote = async id => {
  const res = await shareNoteApi(id);
  if (res) {
    getNotes();
  }
};
onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  getNotes();
});

watch(paginateVal, (next, prev) => {
  getNotes();
});
</script>
<style scoped>
.notes-title {
  margin-top: 20px;
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

.notes-list {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 0;
}
.notes-list__item {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 10px;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.notes-list__item-edit {
  border: none;
  padding: 10px;
  background: #f1e217;
  border-radius: 10px;
  margin-right: 10px;
}
.notes-list__item-delete {
  border: none;
  padding: 10px;
  background: #f11717;
  border-radius: 10px;
}
.notes-list__item-delete:hover {
  color: white;
  transition: 0.5s;
}
.note-list__edit-input {
  border: 1px solid #cccccc;
  padding: 8px;
  font-size: 16px;
  border-radius: 10px;
}
.notes-pagination {
  display: flex;
  justify-content: center;
  margin: 10px;
  gap: 10px;
}
.notes-pagiantion__btn {
  background: #f6f6f6;
  border: none;
  border-radius: 10px;
  padding: 10px;
  font-size: 20px;
  border: 1px solid #000;
}
.notes-pagiantion__btn:disabled {
  background: #c2c2c2;
  color: #565656;
}
.notes-list__item-share {
  border: none;
  padding: 10px;
  background: #17b3f1;
  border-radius: 10px;
  margin-right: 10px;
}
.notes-list__item-sharewrap {
  display: flex;
  flex-direction: column;
  align-items: end;
}
</style>

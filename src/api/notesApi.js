import axios from "axios";
import defaultUrl from "../helpers/constants";
import AxiosInstance from "../helpers/axios";
export const addNoteApi = async text => {
  if (typeof text === "string" && text.trim() === "") return;
  try {
    const res = await axios.post(defaultUrl + "notes/create/", {
      text: text,
    });
    console.log(res);
    if (res.status === 200) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getNotesApi = async itemCount => {
  try {
    const res = await AxiosInstance.get(defaultUrl + `notes/my/${itemCount}`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteNoteApi = async id => {
  try {
    const res = await AxiosInstance.post(defaultUrl + `notes/delete/${id}`);
    console.log(res);
    if (res.status === 200) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const editNoteApi = async (id, text) => {
  try {
    const res = await AxiosInstance.post(defaultUrl + `notes/update/${id}`, {
      text,
    });
    if (res.status === 200) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const shareNoteApi = async id => {
  try {
    const res = await AxiosInstance.post(defaultUrl + `notes/share/${id}`);
    if (res.status == 200) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getSharedNoteApi = async id => {
  try {
    const res = await AxiosInstance.get(defaultUrl + `notes/shared/${id}`);
    if (res.status === 200) {
      return res.data;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

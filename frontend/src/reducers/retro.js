import { createSlice } from "@reduxjs/toolkit";

const retro = createSlice({
  name: "retro",
  initialState: {
    _id: null,
    description: null,
    admin: null,
    participants: [],
    error: null,
    active: false,
  },
  reducers: {
    setRetroId: (store, action) => {
      store._id = action.payload;
    },
    setDescription: (store, action) => {
      store.description = action.payload;
    },
    setAdmin: (store, action) => {
      store.admin = action.payload;
    },
    setParticipants: (store, action) => {
      store.participants = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    setActive: (store, action) => {
      store.active = action.payload;
    },
    deleteRetro: (store, action) => {
      store.retro = store.retro.filter((item) => retro._id !== action.payload);
      console.log(store.retro, "retro");
      console.log(action.payload, "payload");
    },
  },
});

export default retro;

import { createSlice } from "@reduxjs/toolkit";

const retro = createSlice({
  name: "retro",
  initialState: {
    description: null,
    username: null,
    participants: [],
    error: null,
  },
  reducers: {
    setDescription: (store, action) => {
      store.description = action.payload;
    },
    setUsername: (store, action) => {
      store.username = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

export default retro;

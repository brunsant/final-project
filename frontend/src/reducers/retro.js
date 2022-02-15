import { createSlice } from "@reduxjs/toolkit";

const retro = createSlice({
  name: "retro",
  initialState: {
    _id: null,
  },
  reducers: {
    setRetroId: (store, action) => {
      store._id = action.payload;
    },
  },
});

export default retro;

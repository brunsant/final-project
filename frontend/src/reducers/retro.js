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
    // toggleActive: (store, action) => {
    //   const updatedRetro = store.items.map((item) => {
    //     if (item.id === action.payload) {
    //       const updatedTodo = {
    //         ...item,
    //         isComplete: !item.isComplete,
    //       }
    //       return updatedTodo
    //     } else {
    //       return item
    //     }
    //   })

    //   store.items = updatedItems
    // },
  },
});

export default retro;

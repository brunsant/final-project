import { createSlice } from "@reduxjs/toolkit"

const retro = createSlice({
  name: "retro",
  initialState: {
    description: null,
    admin: null,
    participants: [],
    error: null,
  },
  reducers: {
    setDescription: (store, action) => {
      store.description = action.payload
    },
    setAdmin: (store, action) => {
      store.admin = action.payload
    },
    setParticipants: (store, action) => {
      store.participants = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
  },
})

export default retro

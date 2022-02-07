import React from "react"
import { Provider } from "react-redux"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { createStore, combineReducers } from "@reduxjs/toolkit"
import { ChakraProvider } from "@chakra-ui/react"

import Main from "./components/Main"
import Signin from "./screens/Signin"
import Signup from "./screens/Signup"
import NotFound from "./screens/NotFound"
import ProfilePage from "./screens/ProfilePage"
import Thoughts from "./screens/Thoughts"
import Grouping from "./screens/Grouping"
import ActionItems from "./screens/ActionItems"
import Summary from "./screens/Summary"
import Overview from "./screens/Overview"

import user from "./reducers/user"
import retro from "./reducers/retro"

const reducer = combineReducers({
  user: user.reducer,
  retro: retro.reducer,
})

// const store = configureStore({ reducer })

// -- add local storage

const persistedStateJSON = localStorage.getItem("reduxState")
let persistedState = {}

if (persistedStateJSON) {
  persistedState = JSON.parse(persistedStateJSON)
}

const store = createStore(
  reducer,
  persistedState,
  // -- to make the redux devtools work
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()))
})

function App() {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/" element={<Main />} />
            <Route path="/profilepage" element={<ProfilePage />} />
            <Route path="/thoughts" element={<Thoughts />} />
            <Route path="/grouping" element={<Grouping />} />
            <Route path="/actionitems" element={<ActionItems />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  )
}

export default App

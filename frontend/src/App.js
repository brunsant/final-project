import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createStore, combineReducers } from "@reduxjs/toolkit";
import { ChakraProvider } from "@chakra-ui/react";

import Main from "./screens/Main";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import NotFound from "./screens/NotFound";
import ProfilePage from "./screens/ProfilePage";
import AboutUs from "./screens/AboutUs";
import Thoughts from "./screens/Thoughts";
import ActionItems from "./screens/ActionItems";
import Summary from "./screens/Summary";

import styled from "styled-components";

import user from "./reducers/user";
import retro from "./reducers/retro";

const reducer = combineReducers({
  user: user.reducer,
  retro: retro.reducer,
});

// -- add local storage

const persistedStateJSON = localStorage.getItem("reduxState");
let persistedState = {};

if (persistedStateJSON) {
  persistedState = JSON.parse(persistedStateJSON);
}

const store = createStore(
  reducer,
  persistedState,
  // -- to make the redux devtools work
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

function App() {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <BrowserRouter>
          <StylingDiv>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/" element={<Main />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/profilepage" element={<ProfilePage />} />
              <Route path="/thoughts" element={<Thoughts />} />
              <Route path="/actionitems" element={<ActionItems />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </StylingDiv>
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  );
}

export default App;

const StylingDiv = styled.div`
  background-image: url("./background.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  width: 100%;
  font-family: "Roboto", sans-serif;
`;

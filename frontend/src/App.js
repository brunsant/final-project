import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import Main from "./components/Main";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";
import ProfilePage from "./components/ProfilePage";

import user from "./reducers/user";

const reducer = combineReducers({
  user: user.reducer,
});

const store = configureStore({ reducer });

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/main" element={<Main />} />
          <Route path="/profilePage" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

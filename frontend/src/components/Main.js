import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../utils/constants";
import user from "../reducers/user";
import retro from "../reducers/retro";

export const Main = () => {
  const [description, setDescription] = useState("");

  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutUser = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setAccessToken(null));

      localStorage.removeItem("user");
    });
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description, username: userId }),
    };

    fetch(API_URL("retros"), options)
      .then((res) => res.json())
      .then((data) => {
        console.log("RETRO DATA", data);
        if (data.success) {
          batch(() => {
            dispatch(retro.actions.setDescription(data.response.description));
            dispatch(retro.actions.setUsername(data.response.username));

            dispatch(retro.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(retro.actions.setDescription(null));
            dispatch(retro.actions.setError(data.response));
          });
        }
        console.log("test", data);
      });
  };

  return (
    <>
      <div>
        <h1>Welcome to the sprint retro app..</h1>
        <div className="logout-btn-wrapper">
          <button className="logout-btn" onClick={logOutUser}>
            Log out
          </button>
        </div>

        <div>
          <form onSubmit={onFormSubmit}>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Retro info"
            ></input>
            <button type="submit"> Add retro</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Main;

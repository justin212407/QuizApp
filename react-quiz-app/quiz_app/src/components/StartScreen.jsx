import React, { useState } from "react";
import api from "../../api";
import Error from "./Error";

const StartScreen = ({ numQues, username, setUsername, setLoadingState }) => {
  const studentUsername = { username: username };
  const [error, setError] = useState(null);

  function submitUsername() {
    api
      .post("has_taken_quiz/", studentUsername)
      .then((res) => {
        console.log(res.data);
        setLoadingState("active");
        localStorage.setItem("username", username);
      })
      .catch((err) => {
        const error = err.response?.data?.error || "An error occurred";
        console.log(error);
        setError(error);
      });
  }

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQues} questions to test your React mastery</h3>
      {error && <Error error={error} />}
      <input
        placeholder="Enter username"
        className="btn btn-ui"
        style={{ marginBottom: "20px", textTransform: "uppercase" }}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        className="btn btn-ui"
        onClick={submitUsername}
        disabled={username === ""}
      >
        Let's start
      </button>
    </div>
  );
};

export default StartScreen;

import React from "react";

const Progress = ({ questionIndex, username, numQues }) => {
  return (
    <header className="progress">
      <progress max={numQues} value={questionIndex + 1} />
      <p>
        Question<strong>{questionIndex + 1}</strong> / {numQues}
      </p>
      <p>
        Hi, <strong style={{ textTransform: "uppercase" }}>{username}</strong>
      </p>
    </header>
  );
};

export default Progress;

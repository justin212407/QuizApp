import React from "react";

const FinishedScreen = ({ username, quizTotalScore, studentScore }) => {
  const percentage = (studentScore / quizTotalScore) * 100;
  return (
    <div>
      <>
        <p className="result">
          <span></span> Hi{" "}
          <span style={{ textTransform: "uppercase" }}>{username}</span>, you
          scored <strong>{studentScore}</strong> out of {quizTotalScore} (
          {percentage}%)
        </p>
        <p className="highscore">(HighScore: {studentScore} points)</p>

        <button className=" btn btn-ui">Restart Quiz</button>
      </>
    </div>
  );
};

export default FinishedScreen;

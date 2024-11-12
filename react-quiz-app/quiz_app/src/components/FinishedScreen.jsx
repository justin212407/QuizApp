import React from "react";

const FinishedScreen = ({
  quizTotalScore,
  studentScore,
  setLoadingState,
  setQuestionIndex,
  setSelectedOption,
  setCorrectOption,
  setStudentScore,
  setUsername,
}) => {
  const percentage = (studentScore / quizTotalScore) * 100;
  const username = localStorage.getItem("username");

  function restartQuiz() {
    setLoadingState("ready");
    setQuestionIndex(0);
    setSelectedOption(null);
    setCorrectOption(0);
    setStudentScore(0);
    setUsername("");
    localStorage.removeItem("username");
  }
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

        <button className=" btn btn-ui" onClick={restartQuiz}>
          Restart Quiz
        </button>
      </>
    </div>
  );
};

export default FinishedScreen;

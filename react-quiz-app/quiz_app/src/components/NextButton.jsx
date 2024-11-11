import React from "react";

const NextButton = ({
  selectedOption,
  setQuestionIndex,
  setSelectedOption,
  numQues,
  questionIndex,
  correctOption,
  setStudentScore,
  setLoadingState,
  submitQuizToApi,
}) => {
  if (selectedOption === null) return null;

  function submitQuiz() {
    setLoadingState("finished");
    submitQuizToApi();
  }

  if (questionIndex === numQues - 1)
    return (
      <button className="btn btn-ui" onClick={submitQuiz}>
        Submit Quiz
      </button>
    );

  return (
    <button
      className="btn btn-ui"
      onClick={() => {
        setQuestionIndex((prev) => prev + 1);
        if (selectedOption === correctOption) {
          setStudentScore((curr) => curr + 5);
        }
        setSelectedOption(null);
      }}
    >
      Next
    </button>
  );
};

export default NextButton;

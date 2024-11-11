import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import api from "../api";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import FinishedScreen from "./components/FinishedScreen";

const App = () => {
  const [loadingState, setLoadingState] = useState("loading");
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [username, setUsername] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(0);
  const [studentScore, setStudentScore] = useState(0);
  const scorePerQues = 5;
  const numQues = questions.length;
  const quizTotalScore = numQues * scorePerQues;

  const studentQuiz = {
    username: username,
    score: studentScore,
  };

  function submitQuizToApi() {
    api
      .post("submit_quiz/", studentQuiz)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  }

  useEffect(function () {
    api
      .get("questions")
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data);
        setLoadingState("ready");
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <h4>Score: {studentScore}</h4>
      <Main>
        {loadingState === "loading" && <Loader />}
        {error && <Error error={error} />}
        {loadingState == "ready" && (
          <StartScreen
            username={username}
            setUsername={setUsername}
            numQues={numQues}
            key={numQues}
            setLoadingState={setLoadingState}
          />
        )}

        {loadingState == "active" && (
          <>
            <Question
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              question={questions[questionIndex]}
              setCorrectOption={setCorrectOption}
            />

            <NextButton
              selectedOption={selectedOption}
              setQuestionIndex={setQuestionIndex}
              setSelectedOption={setSelectedOption}
              numQues={numQues}
              questionIndex={questionIndex}
              correctOption={correctOption}
              setStudentScore={setStudentScore}
              setLoadingState={setLoadingState}
              submitQuizToApi={submitQuizToApi}
            />
          </>
        )}

        {loadingState == "finished" && (
          <FinishedScreen
            username={username}
            quizTotalScore={quizTotalScore}
            studentScore={studentScore}
          />
        )}
      </Main>
    </div>
  );
};

export default App;

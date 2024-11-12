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
import Progress from "./components/Progress";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const App = () => {
  const [loadingState, setLoadingState] = useState("loading");
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [username, setUsername] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [studentScore, setStudentScore] = useState(0);
  const secondsPerQuestion = 10;
  const scorePerQues = 5;
  const numQues = questions.length;
  const quizTotalScore = numQues * scorePerQues;

  function getQuestion() {
    api
      .get("questions")
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function reloadPage() {
    setLoadingState("finished");
    getQuestion();
    submitQuizToApi(studentScore);
  }

  function submitQuizToApi(updatedScore) {
    const studentQuiz = {
      username: localStorage.getItem("username"),
      score: updatedScore,
    };
    api
      .post("submit_quiz/", studentQuiz)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  }

  useEffect(function () {
    if (localStorage.getItem("username")) {
      return reloadPage();
    }
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
            setTimeRemaining={setTimeRemaining}
            secondsPerQuestion={secondsPerQuestion}
          />
        )}

        {loadingState == "active" && (
          <>
            <Progress
              questionIndex={questionIndex}
              username={username}
              numQues={numQues}
            />
            <Question
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              question={questions[questionIndex]}
              setCorrectOption={setCorrectOption}
            />
            <Footer>
              <Timer
                timeRemaining={timeRemaining}
                setTimeRemaining={setTimeRemaining}
                setLoadingState={setLoadingState}
                submitQuizToApi={submitQuizToApi}
                studentScore={studentScore}
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
            </Footer>
          </>
        )}

        {loadingState == "finished" && (
          <FinishedScreen
            quizTotalScore={quizTotalScore}
            studentScore={studentScore}
            setLoadingState={setLoadingState}
            setQuestionIndex={setQuestionIndex}
            setSelectedOption={setSelectedOption}
            setCorrectOption={setCorrectOption}
            setStudentScore={setStudentScore}
            setUsername={setUsername}
          />
        )}
      </Main>
    </div>
  );
};

export default App;

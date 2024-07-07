import { useState } from "react";
import "../assets/css/quiz.css";
import data from "../components/data.js";

const Quiz = () => {
  const [value, setValue] = useState("");
  const [selectedBtn, setSelectedBtn] = useState("");
  const [count, setCount] = useState(0);
  const [showBtn, setShowBtn] = useState(false);
  const [btnClass, setBtnClass] = useState("selected");
  const [correctIndex, setCorrectIndex] = useState(null);
  const [btnDisable, setBtnDisable] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);


  const [quizzes, setQuizzes] = useState(shuffleQuestionsAndOptions(data));

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function shuffleQuestionsAndOptions(quizzes) {
    const shuffledQuizzes = shuffleArray([...quizzes]);
    return shuffledQuizzes.map((quiz) => ({
      ...quiz,
      options: shuffleArray([...quiz.options]),
    }));
  }

  const handleSelectOption = (e, btn) => {
    setValue(e.target.innerHTML);
    setSelectedBtn(btn);
    setShowBtn(true);
  };

  const getBtnClass = (index) => {
    if (selectedBtn === index) {
      return `btn ${btnClass}`;
    } else if (index === correctIndex) {
      return "btn correct";
    } else {
      return "btn";
    }
  };

  const handleNext = () => {
    setCount((prev) => prev + 1);
    setValue("");
    setSelectedBtn("");
    setShowBtn(false);
    setBtnClass("selected");
    setCorrectIndex(null);
    setBtnDisable(false);
  };

  const handleConfirm = (selectedAns) => {
    if (selectedAns === quizzes[count].ans) {
      setBtnClass("correct");
      setCorrectCount(correctCount + 1);
    } else {
      setBtnClass("incorrect");
      const correctIdx = quizzes[count].options.indexOf(quizzes[count].ans);
      setCorrectIndex(correctIdx);
    }
    setBtnDisable(true);
    setShowBtn(false);
  };

  const handleRestart = () => {
    console.log("clicked");
    setCount(0);
    setCorrectCount(0);
    setQuizzes(shuffleQuestionsAndOptions(data));
  };

  return (
    <div className="container">
      <div className="quiz-card">
        {count < quizzes.length ? (
          <>
            <div className="quiz-card-top">
              <h4>
                Question {count + 1} / {quizzes.length}
              </h4>
              <h4>
                Correct : <span className="correct-count">{correctCount}</span>
              </h4>
            </div>
            <h2>{quizzes[count].ques}</h2>
            <ul className="quiz-options">
              {quizzes[count].options.map((option, index) => (
                <li key={index} className="quiz-option">
                  <button
                    className={getBtnClass(index)}
                    onClick={(e) => handleSelectOption(e, index)}
                    disabled={btnDisable}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
            <div className="btn-group">
              {showBtn ? (
                <button
                  className="nxt-btn"
                  onClick={() => handleConfirm(value, selectedBtn)}
                >
                  Are you sure?
                </button>
              ) : null}
              <button
                className="nxt-btn"
                onClick={() => handleNext(count)}
                disabled={!btnDisable}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div>
            <h2 className="result"> Your score is : {correctCount}</h2>
            <button className="nxt-btn" onClick={handleRestart}>
              Start again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;

import { useState } from "react";
import "../assets/css/quiz.css";
import data from "../components/data.js";

function Quiz() {
  const [value, setValue] = useState("");
  const [selectedBtn, setSelectedBtn] = useState("");
  const [count, setCount] = useState(0);
  const [showBtn, setShowBtn] = useState(false);
  const [btnClass, setBtnClass] = useState("selected");
  const [correctIndex, setCorrectIndex] = useState(null);
  const [btnDisable, setBtnDisable] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const [quizzes, setQuizzes] = useState(data);

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

  const handleNext = (selectedAns, count) => {
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

  return (
    <div className="container">
      <div className="quiz-card">
          {count < quizzes.length ? 
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
          {quizzes[count].options.map((option, index) => {
            return (
              <li key={index} className="quiz-option">
                <button
                  className={getBtnClass(index)}
                  onClick={(e) => handleSelectOption(e, index)}
                  disabled = {btnDisable}
                >
                  {option}
                </button>
              </li>
            );
          })}
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
          <button className="nxt-btn" onClick={() => handleNext(count)} disabled = {!btnDisable}>
            Next
          </button>
          
          </div>
          </>
          
          :
          
           <h2 className="result"> Your score is : {correctCount}</h2>
          }
         
        
      </div>
    </div>
  );
}

export default Quiz;

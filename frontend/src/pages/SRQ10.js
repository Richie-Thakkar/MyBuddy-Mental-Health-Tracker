import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MoodTest.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
function SRQ10(){
  const [selectedOptions, setSelectedOptions] = useState({});
  
  const handleOptionSelect = (questionId, option) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionId]: option,
    }));
  };
  const calculateScore = () => {
    let newScore = 0;
    Object.keys(selectedOptions).forEach((questionId) => {
      const option = selectedOptions[questionId];
      if (option === "Yes") {
        newScore += 1;
      }
    });
    sessionStorage.setItem("SRQ",newScore);
  };
  
    const questions = [
        {
          id: 1,
          question: "Do you often have headaches?",
          options: ["Yes", "No"],
        },
        {
          id: 2,
          question: "Is your appetite poor?",
          options: ["Yes", "No"],
        },
        {
          id: 3,
          question: "Do you sleep badly?",
          options: ["Yes", "No"],
        },
        {
          id: 4,
          question: "Are you easily frightened?",
          options: ["Yes", "No"],
        },
        {
          id: 5,
          question: "Do your hands shake?",
          options: ["Yes", "No"],
        },
        {
          id: 6,
          question: "Do you feel nervous, tense or worried?",
          options: ["Yes", "No"],
        },
        {
          id: 7,
          question: "Is your digestion poor?",
          options: ["Yes", "No"],
        },
        {
          id: 8,
          question: "Do you have trouble thinking clearly?",
          options: ["Yes", "No"],
        },
        {
          id: 9,
          question: "Do you feel unhappy?",
          options: ["Yes", "No"],
        },
        {
          id: 10,
          question: "Do you cry more than usual?",
          options: ["Yes", "No"],
        },
        {
          id: 11,
          question: "Do you find it difficult to enjoy your daily activities?",
          options: ["Yes", "No"],
        },
        {
          id: 12,
          question: "Do you find it difficult to make decisions?",
          options: ["Yes", "No"],
        },
        {
          id: 13,
          question: "Is your daily work suffering?",
          options: ["Yes", "No"],
        },
        {
          id: 14,
          question: "Are you unable to play a useful part in life?",
          options: ["Yes", "No"],
        },
        {
          id: 15,
          question: "Have you lost interest in things?",
          options: ["Yes", "No"],
        },
        {
          id: 16,
          question: "Do you feel that you are a worthless person?",
          options: ["Yes", "No"],
        },
        {
          id: 17,
          question: "Has the thought of ending your life been on your mind?",
          options: ["Yes", "No"],
        },
        {
          id: 18,
          question: "Do you feel tired all the time?",
          options: ["Yes", "No"],
        },
        {
          id: 19,
          question: "Do you have uncomfortable feelings in your stomach?",
          options: ["Yes", "No"],
        },
        {
          id: 20,
          question: "Are you tired easily?",
          options: ["Yes", "No"],
        },
      ];
      
    return(
      <section className="mtestsect">
      <Navbar />
      <span className="mtheading">General Neurotic Disorder Test</span>
      <span className="mtsubheading">
        The following questions are related to certain pains and problems that
        may have bothered you in the last 30 days. Please answer the questions
        honestly
      </span>
      <span className="mtsubheading">
        We would like to reassure you that the answers you are going to provide
        are confidential
      </span>
      <div className="quiz">
        {questions.map((q) => (
          <div key={q.id} className="srqdiv">
            <p className="srqques">{q.question}</p>
            <div className="options">
              {q.options.map((option, index) => (
                <React.Fragment key={index}>
                  <label htmlFor={`${q.id}-${index}`} className="qlabel">
                    {option}
                  </label>
                  <input
                    type="radio"
                    name={`opt-${q.id}`}
                    value={option}
                    id={`${q.id}-${index}`}
                    onChange={() => handleOptionSelect(q.id, option)}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <NavLink to="/PHQ9">
          <button
            className="startButton"
            style={{ marginTop: "1vmax" }}
            disabled={Object.keys(selectedOptions).length !== questions.length}
            onClick={calculateScore}
          >
            Continue
          </button>
        </NavLink>
      </div>
      <Footer />
    </section>
  );
}

export default SRQ10
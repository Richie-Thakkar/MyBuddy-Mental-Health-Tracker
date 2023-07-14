import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MoodTest.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function PHQ9(){
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
        newScore += parseInt(option);
    });
    sessionStorage.setItem("PHQ",newScore);
  };
  
    const questions = [
        {
        id: 1,
        question: "Little Interest or pleasure in doing things",
        options: [0, 1, 2, 3],
        },
        {
        id: 2,
        question: "Feeling down, depressed, or hopeless",
        options: [0, 1, 2, 3],
        },
        {
        id: 3,
        question: "Trouble falling or staying asleep, or sleeping too much",
        options: [0, 1, 2, 3],
        },
        {
        id: 4,
        question: "Feeling tired or having little energy",
        options: [0, 1, 2, 3],
        },
        {
        id: 5,
        question: "Poor appetite or overeating",
        options: [0, 1, 2, 3],
        },
        {
        id: 6,
        question: "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
        options: [0, 1, 2, 3],
        },
        {
        id: 7,
        question: "Trouble concentrating on things, such as reading the newspaper or watching television",
        options: [0, 1, 2, 3],
        },
        {
        id: 8,
        question: "Moving or speaking so slowly that other people could have noticed. Or the opposite being so figety or restless that you have been moving around a lot more than usual",
        options: [0, 1, 2, 3],
        },
        {
        id: 9,
        question: "Thoughts that you would be better off dead, or of hurting yourself",
        options: [0, 1, 2, 3],
        },
        ];
      
    return(
        <section className="mtestsect">
    <Navbar/>
    <span className="mtheading">Depression Test</span>
<span className="mtsubheading">Over the last 2 weeks, how often have you been bothered by any of the following problems?</span>
<span className="mtsubheading">We would like to reassure you that the answers you are going to provide are confidential</span>
<span className="mtsubheading">The ratings to be given are as follows: 0: - Not at all  1: - Several Days 2: - More Than half the days 3: - Nearly Every day</span>
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
                  <input type="radio" name={`opt-${q.id}`} value={option} id={`${q.id}-${index}`} onChange={() => handleOptionSelect(q.id, option)}/>
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{"display":"flex","justifyContent":"center"}}>
      <NavLink to="/GAD7"><button className="startButton" style={{"marginTop":"1vmax"}} disabled={Object.keys(selectedOptions).length !== questions.length} onClick={calculateScore}>Continue</button></NavLink>
  </div>
  <Footer/>
        </section>
    )
}
export default PHQ9
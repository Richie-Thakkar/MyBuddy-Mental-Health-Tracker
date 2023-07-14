import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MoodTest.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
function GAD7(){
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
    
    const MTScore=sessionStorage.getItem("Mood");
    const Email_ID=sessionStorage.getItem("email");
    const quiz1Score=sessionStorage.getItem("SRQ");
    const quiz2Score=sessionStorage.getItem("PHQ");
    const quiz3Score=newScore;
    const reports={Email_ID,MTScore,quiz1Score,quiz2Score,quiz3Score};
    console.log(reports);
fetch('/insertReport', {
  method:'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
   },
  body: JSON.stringify(reports),
})
.catch((error) => console.error(error));
};
    const questions = [
        {
          id: 1,
          question: "Feeling nervous, anxious or on edge",
          options: [0, 1, 2, 3],
        },
        {
          id: 2,
          question: "Not being able to stop or control worrying?",
          options: [0, 1, 2, 3],
        },
        {
          id: 3,
          question: "Worrying too much about different things?",
          options: [0, 1, 2, 3],
        },
        {
          id: 4,
          question: "Trouble relaxing?",
          options: [0, 1, 2, 3],
        },
        {
          id: 5,
          question: "Being so restless that it is hard to sit still?",
          options: [0, 1, 2, 3],
        },
        {
          id: 6,
          question: "Becoming easily annoyed or irritable?",
          options: [0, 1, 2, 3],
        },
        {
          id: 7,
          question: "Feeling afraid as if something awful might happen?",
          options: [0, 1, 2, 3],
        },
      ];
        
    return(
        <section className="mtestsect">
    <Navbar/>
    <span className="mtheading">Anxiety/PTSD Test</span>
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
      <NavLink to="/user/showReports"><button className="startButton" style={{"marginTop":"1vmax"}} disabled={Object.keys(selectedOptions).length !== questions.length} onClick={calculateScore}>Finish Assesment</button></NavLink>
  </div>
  <Footer/>
        </section>
    )
}
export default GAD7
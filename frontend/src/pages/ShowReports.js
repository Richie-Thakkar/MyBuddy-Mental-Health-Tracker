import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ShowReports.css";
import UseToken from "../components/UseToken";
function ShowReports() {
  const [reports, setReports] = useState([]);
const{token}=UseToken();
  useEffect(() => {
    fetch(`/getReport`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      credentials: 'include',
      body: JSON.stringify({ Email_ID: sessionStorage.getItem("email") }),
    })
      .then((response) => response.json())
      .then((data) => setReports(data));
  }, []);

  return (
    <section className="rpsect">
      <Navbar />
      <span className="mtheading">Your Reports</span>
      <span className="mtsubheading">According to the results of our comprehensive assessments, we have generated a report that predicts potential underlying psychological disorders.</span>
        <span className="mtsubheading">It is important to note that these tests have been meticulously designed by reputable organizations such as the World Health Organization (WHO) and Pfizer to detect various psychological disorders.</span>
        <span className="mtsubheading">However, it is crucial to understand that this report is not a substitute for professional healthcare. We strongly encourage our users to seek assistance from qualified healthcare providers if any symptoms of psychological distress are identified in the report.</span>
        <span className="mtsubheading">Even if the report does not indicate any symptoms, if you feel the need to consult a psychiatrist, we highly recommend doing so.</span>
        <span className="mtsubheading">To facilitate your search, we have compiled a curated list of psychiatrists within our network, which you can access through the Navigation bar (The menu at the top) </span>
      <div className="reports">
        {reports && reports.length > 0 ? (
          reports.map((report) => (
            <div className="report" key={report[0]}> 
              <span className="rpheader">Date and Time of Assessment</span>
              <br />
              <span>{report[6]}</span> 
              <br />
              <br />
              <span className="rpheader">Mood</span>
              <br />
              <span>{report[2]}</span> 
              <br />
              <br />
              <span className="rpheader">Probable Psychological Disorder Diagnosed?</span>
              <br />
              <span>{report[3] > 7 ? "Yes" : "No"}</span> 
              <br />
              <br />
              <span className="rpheader">Probable Depression Diagnosed?</span>
              <br />
              <span>{report[4] > 4 ? "Yes" : "No"}</span> 
              <br />
              <br />
              <span className="rpheader">Probable Generalized Anxiety Disorder Diagnosed?</span>
              <br />
              <span>{report[5] > 4 ? "Yes" : "No"}</span> 
              <br />
              <br />
            </div>
          ))
        ) : (
          <div className="norep">
            <span style={{"fontSize":"6vh"}}>No reports found</span>
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
}

export default ShowReports;

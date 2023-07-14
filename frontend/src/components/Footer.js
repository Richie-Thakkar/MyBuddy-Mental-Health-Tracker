import React from "react";
import "../pages/Home.css";
function Footer()
{
    return(
        <div className="footer">
        <span>
        Made with <span role="img" aria-label="heart emoji">❤️</span> by <a href="https://www.linkedin.com/in/richie-thakkar-5a722a206/" target="_blank" style={linkstyle}>Richie</a> using REACT 
        </span>
      </div>
        )
}
const linkstyle={
  textDecoration:"None",
  color:"White",  
};
export default Footer
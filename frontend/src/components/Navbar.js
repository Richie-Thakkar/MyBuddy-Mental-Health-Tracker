import React from 'react';
import '../pages/Home.css'
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import UseToken from './UseToken';
//import SessionManager from './SessionManager';
function Navbar()
{
  const{removeToken}=UseToken();
    const [isMenuOpen, setMenuOpen] = useState(false);
    let navigate = useNavigate();
    
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  //const {sessionId,sessionStatus,storeSessionId,setSessionId,setSessionStatus }=SessionManager();
  const handleLogOut = () => {
    fetch('/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      removeToken();
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("Mood");
      sessionStorage.removeItem("PHQ");
      sessionStorage.removeItem("SRQ");
      navigate("/");
    })
    .catch((error) => {
      console.error(error);
    });
  };
  
  
    return(
        <div className='outer'>
        <div className='inner1'>
          <div className='logoBlock'>
          <NavLink to='/user/home'><h3 className='logo'>MyBuddy</h3></NavLink>
          </div>
          <nav className={`navBlock ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              <NavLink to='/user/aboutUs'><li>About us</li></NavLink>
              <NavLink to='/user/contactUs'><li>Contact us</li></NavLink>
              <NavLink to='/user/tasks'><li>Tasks</li></NavLink>
              <NavLink to='/user/showReports'><li>Show Reports</li></NavLink>
              <NavLink to='/user/ConsultPsychiatrist'><li>Consult Psychiatrist</li></NavLink>
              <li style={{"cursor":"pointer"}} onClick={handleLogOut}>Log Out</li>
            </ul>
          </nav>
          <div className={`menuToggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <div className='hamburger'></div>
          </div>
        </div>
      </div>
    )
};
export default Navbar


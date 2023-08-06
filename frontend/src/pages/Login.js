import './Login.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login(props) {
  useEffect(() => {
    const toggleSignup = () => {
      document.querySelector('.cont').classList.toggle('s-signup');
    };
  
    const imgBtn = document.querySelector('.img-btn');
    if (imgBtn) {
      imgBtn.addEventListener('click', toggleSignup);
    }
  
    return () => {
      if (imgBtn) {
        imgBtn.removeEventListener('click', toggleSignup);
      }
    };
  }, []);
  
  const navigate = useNavigate();
  const [at, setAT] = useState('');
  const [credentials, setCredentials] = useState({
    Email_ID: '',
    Password: '',
  });
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
//const {storeSessionId}=SessionManager();
  const handleSignInSubmit = (event) => {
    event.preventDefault();
    const Email_ID = credentials.Email_ID;
    const Password = credentials.Password;
    const data = { Email_ID, Password };
    console.log(data);
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        console.log(Email_ID);
        setAT(responseData.status);
        if(responseData.atk !== undefined)
        {
        props.setToken(responseData.atk);
        sessionStorage.setItem('email',Email_ID);
        if (responseData.status === 'Auth Success!') {
          navigate('/user/home');}
        else alert("Invalid Email address or Password");
        }
      })
      .catch((error) => console.error(error));
  };
  /*useEffect(() => {
    if (at === 'Auth Success!') {
      navigate('/user/home');
    }
  }, [at]);
*/

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    const FirstName = event.target.elements.FirstName.value;
    const LastName = event.target.elements.LastName.value;
    const Email_ID = event.target.elements.Email_ID.value;
    const Password = event.target.elements.Password.value;
    const ConfirmPassword = event.target.elements.ConfirmPassword.value;
    if(Password!==ConfirmPassword)
    {
      alert("Password and confirm password did not match");
      return false;
    }
    const data = {
      FirstName,
      LastName,
      Email_ID,
      Password,
    };
    console.log(data);
    fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAT(data.status);
        alert("Registrattion Succesful!! Welcome to MyBuddy Family!!");
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };
const handleForgotPassword=(event)=>
{
  let email=prompt("Please enter your email address");
if(email!==undefined)
{
  fetch('/checkMail', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(email),
  })
    .then((response) => response.json())
    .then((respData) => {
if(respData.status==='found')
{
  
  let otpcheck=prompt("Enter the OTP sent to your registered Email Address");
  if(otpcheck===respData.otp)
  {
    props.setToken("JustADummyCookieToByPAss");
    sessionStorage.setItem("email",email);
    navigate("/user/ForgotPassword");
  }
  else alert("Invalid Otp! Please try again");
}
else alert("Entered Email ID is not registered with us\nPlease Sign up if you are a new user");
    })
}
}
  
  return (
    <div className='wrapper'>
      <div className="cont">
        <div className="form sign-in">
          <h2>Sign In</h2>
          <form onSubmit={handleSignInSubmit} method="post">
            <label className='lglabel'>
              <span>Email Address</span>
              <input
                type="email"
                id="email"
                name="Email_ID"
                className="lginput"
                onChange={handleChange}
                required
              />
            </label>
            <label className='lglabel'>
              <span>Password</span>
              <input
                type="password"
                id="password"
                name="Password"
                className="lginput"
                onChange={handleChange}
                required
              />
            </label>
            <button className="submit btn" id="b" value="login now" name="submit" type="submit">
              Sign In
            </button>
            <div className="foot-lnk" >
          <a href="#" className='respheading' onClick={handleForgotPassword}>Forgot Password?</a>
        </div>
          </form>
        </div>
        <div className="sub-cont">
          <div className="img">
            <div className="img-text m-up">
              <h2>Welcome to MyBuddy</h2>
              <br />
              <h4>Your very own Mental health tracker!</h4>
              <br />
              <br />
              <h4>Discover Inner Balance and Well-being with MyBuddy!</h4>
              <br />
              <br />
              <br />
              <h4>New to MyBuddy?</h4>
            </div>
            <div className="img-text m-in">
              <h2>Part of MyBuddy Family?</h2>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <h4>If you already have an account, just sign in. We've missed you!</h4>
            </div>
            <div className="img-btn">
              <span className="m-up">Sign Up</span>
              <span className="m-in">Sign In</span>
            </div>
          </div>
          <div className="form sign-up">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUpSubmit} method="POST">
              <label className='lglabel'>
                <span>First Name</span>
                <input type="text" name="FirstName" className="lginput"
                 />
              </label>
              <label className='lglabel'>
                <span>Last Name</span>
                <input type="text" name="LastName" className="lginput"
                 />
              </label>
              <label className='lglabel'>
                <span>Email</span>
                <input type="email" name="Email_ID" className="lginput"
                 />
              </label>
              <label className='lglabel'>
                <span>Password</span>
                <input type="password" name="Password" className="lginput"
                 />
              </label>
              <label className='lglabel'>
                <span>Confirm Password</span>
                <input type="password" name="ConfirmPassword" className="lginput"
                />
              </label>
              <button type="submit" className="submit btn" name="submit-reg">
                Sign Up Now
              </button>
            </form>
            
          </div>
        </div>
      </div>
      <div className="login-wrap">
  <div className="login-html">
  <h2 className='respheading'>Welcome To MyBuddy</h2>
        <h2 className='respheading'>Your very own Mental Health Tracker</h2>
    <input id="tab-1" type="radio" name='tab' className="sign-in" defaultChecked /><label htmlFor="tab-1" className="tab">Sign In</label>
    <input id="tab-2" type="radio" name='tab' className="sign-up"/><label htmlFor="tab-2" className="tab">Sign Up</label>
    <div className="login-form">
      <form className="sign-in-htm" onSubmit={handleSignInSubmit} method="post">
        <div className="group">
          <label htmlFor="user" className="label">Username</label>
          <input  type="text" className="input"
          id="email"
          name="Email_ID"
          onChange={handleChange}
          required
          />
        </div>
        <div className="group">
          <label htmlFor="pass" className="label">Password</label>
          <input 
          type="password"
          className='input'
          id="password"
          name="Password"
          onChange={handleChange}
          required
          />
        </div>
        <div className="group">
          <input type="submit" className="button" value="Log in"/>
        </div>
        <div className="hr"></div>
        <div className="foot-lnk">
          <a href="#forgot" className='respheading' onClick={handleForgotPassword}>Forgot Password?</a>
        </div>
      </form>
      <form className="sign-up-htm" onSubmit={handleSignUpSubmit} method='POST'>
        <div className="group">
          <label htmlFor="user" className="label" >First Name</label>
          <input id="user" type="text" name="FirstName" className="input"/>
        </div>
        <div className="group">
          <label htmlFor="user" className="label" >Last Name</label>
          <input id="user" type="text" name="LastName" className="input"/>
        </div>
        <div className="group">
          <label htmlFor="pass" className="label">Email Address</label>
          <input id="pass" type="text" name="Email_ID" className="input"/>
        </div>
        
        <div className="group">
          <label htmlFor="pass" className="label">Password</label>
          <input id="pass" type="password" name="Password" className="input" data-type="password"/>
        </div>
        <div className="group">
          <label htmlFor="pass" className="label">Repeat Password</label>
          <input id="pass" type="password" name="ConfirmPassword" className="input" data-type="password"/>
        </div>
        <div className="group" >
          <input type="submit" className="button" value="Sign Up" />
        </div>
      </form>
    </div>
  </div>
</div>
    </div>
  
  
  
  );
}

export default Login;

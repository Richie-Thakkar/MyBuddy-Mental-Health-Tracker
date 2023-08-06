import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UseToken from "../components/UseToken";
function ForgotPassword()
{
    const{removeToken}=UseToken();
    const [credentials, setCredentials] = useState({
        password: '',
        confirmPassword: '',
      });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setCredentials({
          ...credentials,
          [e.target.name]: e.target.value,
        });
      };
    const handleUpdate=(event)=>{
        event.preventDefault();
        if(credentials.password!==credentials.confirmPassword)
        {
            alert("Password and Confirm Password did not Match");
        }
        else if(credentials.password===credentials.confirmPassword)
        {
            const data={
                email:sessionStorage.getItem('email'),
                newPassword:credentials.password,
            }
            fetch('/updatePassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
              })
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                    if(responseData.status === 'success')
                    {
                        sessionStorage.removeItem('email');
                        sessionStorage.removeItem('token'); 
                        alert("Password Updated Succesfully");
                        removeToken();
                        navigate("/");
                    }
                    else alert("Password Update Failed! Please try again");
                  })
                  .catch((error) => console.error(error));
        }
    };
    return (
<section className="myform-area">
              <div className="ctr">
                  <div className="row justify-content-center">
                      <div className="col-lg-8">
                          <div className="form-area login-form">
                              <div className="form-content">
                                  <h2>MyBuddy</h2><br />
                                  <p>Your very own Mental health tracker</p>
                                </div>
                              <div className="form-input">
                                  <h2>Update Password</h2>
                                  <form onSubmit={handleUpdate} method="POST">
                                      <div className="form-group">
                                          <input type="password" onChange={handleChange} id="password" name="password" required/>
                                          <label>Enter New Password</label>
                                      </div>
                                      <div className="form-group">
                                          <input type="password" onChange={handleChange} id="confirmPassword" name="confirmPassword" required/>
                                          <label>Confirm New Password</label>
                                      </div>
                                      <div className="myform-button">
                                          <button className="myform-btn">Update</button>
                                      </div>
                                  </form>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
        )
};
export default ForgotPassword;
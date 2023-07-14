import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ContactUs.css";
import emailjs from '@emailjs/browser';
import { useRef } from "react";

function ContactUs(){
    const form = useRef();

    const sendmail = (e) => {
      e.preventDefault();
      emailjs.sendForm("service_za2208f","template_crpwmkv",form.current,"RTrBhud1dn1UdczWF")
        .then((result) => {
            console.log(result.text);
            alert("Thank you for contacting Us...We will get in touch with you shortly!")
        }, (error) => {
            console.log(error.text);
        });
    };
    return(
        <section className="ctsection">
            <Navbar/>
            <div className="container">
                <div className="contact-box">
                    <div className="contact-left">
                        <h3>Send your request</h3>
                        <form ref={form} onSubmit={sendmail}>
                            <div className="input-row">
                                <div className="input-group">
                                    <label className="culabel" >Name</label>
                                    <input type="text" placeholder="Enter your name here" name="from_name" className="cuinput" required/>
                                </div>
                                <div className="input-group">
                                    <label className="culabel" >Phone</label>
                                    <input type="text" placeholder="Enter your contact number(optional)" name="ph" className="cuinput" />
                                </div>
                            </div>
                            <div className="input-row">
                                <div className="input-group">
                                    <label className="culabel" >Email</label>
                                    <input type="email" placeholder="Enter your email id(optional)" name="email_id" className="cuinput" />
                                </div>
                                <div className="input-group">
                                    <label className="culabel" >Subject</label>
                                    <input type="text" placeholder="Enter your Query" name="title" className="cuinput" required/>
                                </div>
                            </div>
                            <label className="culabel" >Message</label>
                            <textarea  rows="5" placeholder="Enter a brief description about your query" name="message"></textarea>
                            <div className="centrewrapper"><button type="submit" className="ctbtn">SEND</button></div>
                            
                        </form>
                    </div>
                    <div className="contact-right">
                        <h3>Reach Us</h3>
                        <table>
                            <tbody>
                            <tr>
                                <td>Email</td>
                                <td>contactus@insurancesaathi.com</td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>+91 1800 234 567 8901</td>
                            </tr>
                            </tbody>
                        </table>
                       
                    </div>
                </div>   
            </div>
            <Footer/>
        </section>
        
    )
    }
    export default ContactUs
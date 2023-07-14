import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import "./AboutUs.css"
function AboutUs(){
return(
    <div className="abtdiv">
    <Navbar/>
    <div className="about-section">
            <div className="inner-container">
                <h1>About Us</h1>
                <p className="text">
                At MyBuddy, our mission is to create a safe and inclusive space where individuals can assess their psychological well-being remotely and receive the necessary support. We understand that seeking professional help can be intimidating or inconvenient for some people, and we strive to bridge that gap by offering a personalized and user-friendly experience.
                </p>
                <p className="text">
                At MyBuddy, we are committed to creating a positive impact on mental health by providing accessible tools, support, and resources. We prioritize user privacy and ensure that all data shared with us remains secure and confidential. Our team consists of dedicated professionals who are passionate about mental health and have extensive experience in the field.
                </p>
                <p className="text">
                Join us on this journey to prioritize your mental well-being. Together, let's break the stigma surrounding mental health and empower individuals to live happier, healthier lives. Remember, you are not alone—MyBuddy is here to support you every step of the way.
                </p>
            </div>
        </div> 
        <Footer/>
    </div>
)
}
export default AboutUs
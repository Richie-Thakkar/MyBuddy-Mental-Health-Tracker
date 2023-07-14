import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageUploader from '../components/ImageUploader';
import { NavLink } from 'react-router-dom';
function MoodTest() {
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);
  
  const handleUploadSuccess = () => {
    setIsUploadSuccessful(true);
  };

  return (
    <div className="mtestsect">
      <Navbar />
      <span className="mtheading" style={{"textAlign":"center"}}>Mood Test</span>
      <span className="mtsubheading"style={{"textAlign":"center"}}>
        For the mood test, you will be required to click a photo of yourself and submit it here.
      </span>
      <span className="mtsubheading"style={{"textAlign":"center"}}>
        Do not worry about your privacy since we do not store the photo. As soon as the analysis is complete, the photo is deleted from our database.
      </span>
      <div className="upsect">
        <ImageUploader onUploadSuccess={handleUploadSuccess} />
        <NavLink to="/SRQ10">
          <button className="startButton" style={{ marginTop: '1vmax' }} disabled={!isUploadSuccessful}>
            Continue
          </button>
        </NavLink>
        <span className="mtsubheading" style={{ marginTop: '1.5vmax' }}>Please note that you have to complete all the tests for your report to be generated.</span>
      </div>
      <Footer />
    </div>
  );
}

export default MoodTest;

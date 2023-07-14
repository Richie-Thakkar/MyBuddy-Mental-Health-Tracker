import React, { useState } from 'react';
import '../pages/Home.css';
const ImageUploader = ({ onUploadSuccess }) => {
  const [isResponseSuccessful, setIsResponseSuccessful] = useState(false);
  
  const handleImageUpload = async () => {
    try {
      const file = await getSelectedFile();
      const base64String = await convertToBase64(file);
      await saveImageToBackend(base64String);
    } catch (error) {
      console.error(error);
    }
  };

  const getSelectedFile = () => {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.required = true;
      input.onchange = (event) => {
        const file = event.target.files[0];
        resolve(file);
      };

      input.click();
    });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
        resolve(base64String);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    });
  };

  const saveImageToBackend = async (base64String) => {
    const url = 'https://hydra-ai.p.rapidapi.com/dev/faces/analyse/';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '9eabe601b6msh1ea06cb8d54a0d4p15c5ffjsn511bfb4c034f',
        'X-RapidAPI-Host': 'hydra-ai.p.rapidapi.com'
      },
      body: JSON.stringify({
        image: base64String
      })
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(base64String);
      console.log(result);
      if (result.body.ndetected_faces > 0) {
        const emotions = result.body.detected_faces[0].info.emotions;
        const maxEmotion = Object.keys(emotions).reduce((prevEmotion, currEmotion) => {
          return emotions[currEmotion] > emotions[prevEmotion] ? currEmotion : prevEmotion;
        });
        console.log(maxEmotion);
        sessionStorage.setItem("Mood",maxEmotion);
        setIsResponseSuccessful(true);
        onUploadSuccess(); 
      } else {
        setIsResponseSuccessful(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button className="startButton" onClick={handleImageUpload}>
        Upload
      </button>
      {isResponseSuccessful && <span>Upload successful!</span>}
    </>
  );
};

export default ImageUploader;

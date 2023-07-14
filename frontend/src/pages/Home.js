import './Home.css';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { json } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import SessionManager from '../components/SessionManager';
//var data
//var response
/*const quote =async () =>{
  try{response = await fetch("https://zenquotes.io/api/quotes/",{method:"GET",mode:"no-cors"})
  // response = await axios.get("https://zenquotes.io/api/quotes/"/*,{headers:{'Acces-Control-Allow-Origin':'*'}})
  data = await response.json()}
  catch(eroor) {console.log(eroor);}
  console.log(response)
  console.log(data);
}*/
const url = 'https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9eabe601b6msh1ea06cb8d54a0d4p15c5ffjsn511bfb4c034f',
		'X-RapidAPI-Host': 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	var result = await response.text();
	console.log(result);
  var qt=JSON.parse(result);
} catch (error) {
	console.error(error);
}
function Home() {
  return (
    <div className='homeWrapper'>
      <Navbar/>
      <div className='entryMessage'>
<div className='entryText'>
<section className='entryCnt'>
<div className='innerDiv'>
  <div className='entryWrapper'>
    <span style={{outline:"none"}}>
<p><span className='entryHeader'>Assess your Mental health hassle free at your fingertips</span></p>
    </span>
  </div>
  <div className="desc">
    <span style={{fontSize:"20px"}}>
      <span style={{color: "white"}}>
  MyBuddy is a mental health tracker designed to detect symptoms of PTSD,anxiety and depression and provide you personalized support with report generation and pyschiatrist consultation alongwith stress-buster activities. Ready to take time for yourself?
</span>
</span>
<div className='btdiv'><NavLink to='/user/moodTest'><button type='submit' className='startButton'>Take Assesment</button></NavLink></div>
</div>
</div>
</section>
</div>
</div>
<span className='quote'>
  <p style={{textAlign:"center"}}>{qt["text"]}</p>
  <p style={{textAlign:"end"}}>--{qt["author"]}</p>
</span>
<div className='infowrapper'>
<div className='info'>
<img className='infoimg' src='https://cdn.pixabay.com/photo/2017/10/22/18/30/pencil-2878764_640.jpg' alt='Stress'/>
<p>
Stress is a process, not a diagnosis. We experience stress when there is an imbalance between the demands being made on us and our resources to cope with those demands.
</p>
<br /><a href="https://www.who.int/news-room/questions-and-answers/item/stress#:~:text=Stress%20makes%20it%20hard%20for,or%20eat%20more%20than%20usual." target='_blank'>Signs and Symptoms</a><br /><br />
<a href="https://www.mind.org.uk/information-support/types-of-mental-health-problems/stress/treatment-for-stress/" target='_blank'>Treatments</a><br /><br />
<a href="https://www.flushinghospital.org/newsletter/the-3-different-types-of-stress-and-how-each-can-affect-our-health/" target='_blank'>Types</a><br /><br />
<NavLink to='/user/consultPsychiatrist'><button className='psybtn'><span>Find a Specialist</span><span>{'>'}</span></button></NavLink>
</div>
<div className='info'><img className='infoimg' src="https://cdn.pixabay.com/photo/2017/01/30/02/20/anxiety-2019928_640.jpg" alt="Anxiety" />
<p>Anxiety is a feeling of uneasiness and worry, usually generalized and unfocused as an overreaction to a situation that is only subjectively seen as menacing.</p>
<br /><br /><a href="https://www.nimh.nih.gov/health/topics/anxiety-disorders"target='_blank'>Signs and Symptoms</a><br /><br />
<a href="https://www.nimh.nih.gov/health/topics/anxiety-disorders"target='_blank'>Treatments</a><br /><br />
<a href="https://www.nimh.nih.gov/health/topics/anxiety-disorders"target='_blank'>Types</a><br /><br />
<NavLink to='/user/consultPsychiatrist'><button className='psybtn'><span>Find a Specialist</span><span>{'>'}</span></button></NavLink>
</div>
<div className='info'><img className='infoimg' src="https://cdn.pixabay.com/photo/2017/10/07/14/55/depression-2826711_1280.jpg" alt="Depression" />
<p>
Depression is a mental state of low mood and aversion to activity.It affects more than 280 million people of all ages about 3.5% of the global population.
</p><br />
<br /><a href="https://www.who.int/news-room/fact-sheets/detail/depression"target='_blank'>Signs and Symptoms</a><br /><br />
<a href="https://www.who.int/news-room/fact-sheets/detail/depression"target='_blank'>Treatments</a><br /><br />
<a href="https://www.health.harvard.edu/mind-and-mood/six-common-depression-types"target='_blank'>Types</a><br /><br />
<NavLink to='/user/consultPsychiatrist'><button className='psybtn'><span>Find a Specialist</span><span>{'>'}</span></button></NavLink>
</div>
</div>
<Footer/>
</div>

);
}

export default Home;

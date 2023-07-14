import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './Tasks.css';

function Tasks() {
  
  const tasks = [
    {
      title: 'Do Exercise',
      description:
        'Quick bursts of movement are great if your stress is making you feel jittery or like your heart is beating faster than normal.',
      link: '',
    },
    {
      title: 'Give yourself a massage',
      description: 'It reduces stress and improves circulation all over the body.',
      link: '',
    },
    {
      title: 'Dance carefree',
      description:
        'Dancing to music from a happy time and place in your life can trigger positive memories, taking your mind off your stress.',
      link: 'https://open.spotify.com/playlist/37i9dQZF1DX0BcQWzuB7ZO',
    },
    {
      title: 'Take a bath',
      description:
        'Run a bath and sink on in. By changing the body temperature, it’s the full sensory slowing down—its kind of like rebooting a computer that has all these windows open doing too much processing.',
      link: '',
    },
    {
      title: 'Deep Breathing',
      description: 'Practice deep breathing exercises to calm your mind and reduce stress.',
      link: '',
    },
    {
      title: 'Mindful Meditation',
      description: 'Take a few minutes each day to practice mindfulness meditation.',
      link: '',
    },
    {
      title: 'Nature Walk',
      description: 'Go for a walk in nature and enjoy the fresh air and natural surroundings.',
      link: '',
    },
    {
      title: 'Journaling',
      description: 'Write down your thoughts and feelings in a journal.',
      link: '',
    },
    {
      title: 'Laughing',
      description: 'Watch a funny movie or spend time with friends who make you laugh.',
      link: '',
    },
    {
      title: 'Listening to Music',
      description: 'Create a playlist of your favorite songs or listen to calming music.',
      link: 'https://open.spotify.com/playlist/YourPlaylistID',
    },
    {
      title: 'Yoga or Stretching',
      description: 'Engage in gentle yoga or stretching exercises to release tension in your body.',
      link: 'https://www.youtube.com/your-yoga-tutorial',
    },
  ];
  
const settings={
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  mouseTracking:true,
  arrows:true,
};
/*<AliceCarousel
    renderPrevButton={() => {
      return <p className="p-4 absolute left-0 top-0">Previous Item</p>
    }}
    renderNextButton={() => {
      return <p className="p-4 absolute right-0 top-0">Next Item</p>
    }}/>*/
  return (
    <section className="tasksect">
      <Navbar />
      <br />
      <br /><br />
      <span className="theading">Feeling Stressed?</span>
      <span className="theading">Perform some stress buster tasks</span>
      <div className="containertsk">
        <Slider {...settings}>
          {tasks.map((task, index) => (
            <div className="box" key={index}>
              <div className="icon">
                <span className="icon-letter">Hover/Touch To Reveal</span>
              </div>
              <div className="content">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                {task.link && (
                  <a href={task.link} className="Link">
                    Try this Spotify Playlist
                  </a>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <span className='theading' style={{marginTop:'5px'}}>Slide for more tasks</span>
      <Footer />
    </section>
  );
}

export default Tasks;
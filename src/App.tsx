import React, { useRef, useState, useEffect } from 'react';
import styles from './App.module.scss';
import Card from './components/carousel';
//import MusicPlayer from './components/musicplayer';
import Navbar from './components/navbar';
import About from './components/about';
import Contact from './components/contact';
//import Projects from './components/projects';

function App() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Create Audio objects for the card expand/close sound effects
  const slideIn = useRef(new Audio('../assets/tapeinsertcut.mp3'));
  slideIn.current.volume = 0.5;
  const slideOut = useRef(new Audio('../assets/tapeeject.mp3'));
  slideOut.current.volume = 0.4;

  // Load about page on default
  useEffect(() => {
    setActiveSection('about');
  }, []);

  const handleButtonClick = (section: string) => {
    if (section === activeSection) {
      slideOut.current.play();
      setActiveSection(null); // Move the current section back up
    } else {
      slideIn.current.play();
      setActiveSection(section); // Show the new section
    }
  };

  return (
    <div className={styles.App}>
      <div className={styles.stars1}></div>
      <div className={styles.stars2}></div>
      <div className={styles.stars3}></div>
      <div className={styles.navbar} >
        <Navbar onButtonClick={handleButtonClick}/>
      </div>
      <img className={styles.spotlightimg} src="https://personalportfoliopublicassets.s3.us-east-1.amazonaws.com/spotlight.png" alt="Spotlight" />
      <div className={styles.spotlight}> 
        <div></div>
        <div></div> {/* empty divs used for spotlight css animation*/}
      </div>
      <div className={`${styles.aboutContainer} ${activeSection === 'about' ? styles.dropDown : styles.moveUp}`}>
        <About />
      </div>
      <div className={`${styles.cardContainer} ${activeSection === 'featured' ? styles.dropDown : styles.moveUp}`}>
        <Card />
      </div>
      <div className={`${styles.projectsContainer} ${activeSection === 'projects' ? styles.dropDown : styles.moveUp}`}>
        {/*<Projects />*/}
      </div>
      <div className={styles.musicplayer}>
        {/*<MusicPlayer />*/}
      </div>
      <div className={`${styles.contactContainer} ${activeSection === 'contact' ? styles.dropDown : styles.moveUp}`}>
        <Contact />
      </div>
    </div>
  );
}

export default App;

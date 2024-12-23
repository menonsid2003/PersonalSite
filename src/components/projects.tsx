import React, { useState } from 'react';
import styles from './projects.module.scss';

const Projects: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cards = [
    {
      title: 'Game Haven',
      imgSrc: 'https://personalportfoliopublicassets.s3.us-east-1.amazonaws.com/gamehaven.png',
      githubLink: 'https://github.com/menonsid2003/GameStore-Website',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      description: 'A full-stack e-commerce website for video games.',
      extra: 'This project was built as part of a team of 4 developers.',
    },
    {
      title: 'Stock Analysis App',
      imgSrc: 'https://personalportfoliopublicassets.s3.us-east-1.amazonaws.com/stockapp.png',
      githubLink: 'https://github.com/menonsid2003/StockDataVisualizer',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      description: 'A financial analysis tool with advanced charting.',
      extra: 'Provides support for over 1200 data points.',
    },
    {
      title: 'Parking Buddy',
      imgSrc: 'https://personalportfoliopublicassets.s3.us-east-1.amazonaws.com/parkingbuddy.png',
      githubLink: 'https://github.com',
      technologies: ['React', 'Firebase', 'Google Maps API'],
      description: 'An app to find and book parking spaces in real time.',
      extra: 'Integrated with Google Maps for live parking availability.',
    },
    {
      title: 'Personal Portfolio',
      imgSrc: 'path_to_your_image4.jpg',
      githubLink: 'https://github.com/menonsid2003/PersonalSite',
      technologies: ['React', 'TypeScript', 'AWS Amplify'],
      description: 'My personal website showcasing projects and skills.',
      extra: 'Deployed using AWS S3 and Amplify for scalability.',
    },
    {
      title: 'Wearable Active Tracker',
      imgSrc: 'https://personalportfoliopublicassets.s3.us-east-1.amazonaws.com/carttDemo.png',
      githubLink: 'https://github.com',
      technologies: ['Unity', 'WebSocket', 'Polhemus Trackers'],
      description: 'A motion tracking system for VR rehabilitation.',
      extra: 'Focus on real-time tracking and calibration.',
    },
  ];

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <div>
      <h2 className={styles.title}>Projects</h2>
      <div className= {styles.arrows}>
        <button className={styles.arrow} onClick={handlePrev}>
          &lt;
        </button>
        <button className={styles.arrow} onClick={handleNext}>
          &gt;
        </button>
        </div>
      <div className={styles.carousel}>
        <ul className={styles.carousel__list}>
          {cards.map((card, index) => (
            <li
              key={index}
              className={`${styles.carousel__item} ${index === activeIndex ? styles.active : ''}`}
              style={{ display: index === activeIndex ? 'block' : 'none' }}
            >
              <div className={styles.name}>{card.title}</div>
              <div className={styles.technologies}>
              <img src={card.imgSrc} alt={card.title} />
              <div className={styles.description}>{card.description}</div>
              <div className={styles.extra}>{card.extra}</div>
              
                <strong>Technologies:</strong>{' '}
                {card.technologies.map((tech, i) => (
                  <span key={i} className={styles.technology}>
                    {tech}
                    {i < card.technologies.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
              <button
                className={styles.githubButton}
                onClick={(event) => {
                  event.stopPropagation();
                  window.open(card.githubLink, '_blank');
                }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/640px-Octicons-mark-github.svg.png"
                  alt="GitHub"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;

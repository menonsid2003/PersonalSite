import React, { useEffect, useRef, useState } from 'react';
import styles from './carousel.module.scss';

/* sfx from pixabay */
const Card: React.FC = () => {
  const carouselListRef = useRef<HTMLUListElement | null>(null);
  const elemsRef = useRef<HTMLLIElement[]>([]);
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);

  // Create Audio objects for the card expand/close sound effects
  const expandAudio = useRef(new Audio('https://personalportfoliopublicassets.s3.us-east-1.amazonaws.com/cardexpand.mp3'));
  const closeAudio = useRef(new Audio('https://personalportfoliopublicassets.s3.us-east-1.amazonaws.com/closecard.mp3'));

  // Set the volume level (0 is muted, 1 is the maximum volume)
  expandAudio.current.volume = 0.7;
  closeAudio.current.volume = 0.7;

  useEffect(() => {
    const carouselList = carouselListRef.current;
    const elems = elemsRef.current;

    // Add an event listener for click events on the carousel
    const handleCarouselClick = (event: MouseEvent) => {
      const newActive = event.target as HTMLElement;
      const isItem = newActive.closest(`.${styles.carousel__item}`) as HTMLElement;

      if (!isItem) {
        return;
      }

      const currentCardPos = elems.findIndex((elem) => elem && elem.dataset.pos === '0');
      
        // If the clicked card is already expanded, do nothing
  if (isItem.dataset.pos === '0' && expandedCardIndex === currentCardPos) {
    return; // Do not close the card
  }

      if (isItem.dataset.pos === '0') {
        if (currentCardPos !== -1) {
          if (expandedCardIndex === currentCardPos) {
            return;
          } else {
            // If the card is being expanded, play expand audio
            expandAudio.current.play();
          }
          // Toggle expansion state
          setExpandedCardIndex((prevIndex) => (prevIndex === currentCardPos ? null : currentCardPos));
        }
      } else {
        // Collapse the expanded card when switching to another card
        if (expandedCardIndex !== null) {
          // Play the close audio when any expanded card is collapsed
          closeAudio.current.play();
        }
        setExpandedCardIndex(null);
        update(isItem as HTMLElement);
      }
    };

    const update = (newActive: HTMLElement) => {
      const newActivePos = Number(newActive.dataset.pos);

      const current = elems.find((elem) => elem.dataset.pos === '0');
      const prev = elems.find((elem) => elem.dataset.pos === '-1');
      const next = elems.find((elem) => elem.dataset.pos === '1');
      const first = elems.find((elem) => elem.dataset.pos === '-2');
      const last = elems.find((elem) => elem.dataset.pos === '2');

      if (current) {
        current.classList.remove(styles.carousel__item_active);
      }

      [current, prev, next, first, last].forEach((item) => {
        if (item) {
          const itemPos = Number(item.dataset.pos);
          item.dataset.pos = getPos(itemPos, newActivePos).toString();
        }
      });

      newActive.classList.add(styles.carousel__item_active);
    };

    const getPos = (current: number, active: number) => {
      const diff = current - active;

      if (Math.abs(current - active) > 2) {
        return -current;
      }

      return diff;
    };

    if (carouselList) {
      carouselList.addEventListener('click', handleCarouselClick);
    }

    // Clean up event listener on unmount
    return () => {
      if (carouselList) {
        carouselList.removeEventListener('click', handleCarouselClick);
      }
    };
  }, [expandedCardIndex]);

  return (
    <div>
    <h2 className={styles.title}>Featured Projects</h2>
    <div data-testid="card-component" className={styles.carousel}>
      <ul className={styles.carousel__list} ref={carouselListRef}>
        <li
          ref={(el) => (elemsRef.current[0] = el as HTMLLIElement)}
          className={`${styles.carousel__item} ${expandedCardIndex === 0 ? styles.expanded : ''}`}
          data-pos="-2"
        >
          <img src="https://personalportfoliopublicassets.s3.us-east-1.amazonaws.com/gamehaven.png" alt="Description 1" />
          <div className={styles.text}>Game Haven</div>
          {expandedCardIndex === 0 && (
            <div className={styles.expandedContent}>
              <div className={styles.info}>
              <ul>
                  <li>
                Constructed a full-stack web application that mimicked an online video game store, with a dynamically updated store page
                containing hundreds of games and functionality that allowed visitors to create a cart and checkout items.
                </li>
                  <li>
                  Incorporated and integrated a diverse array of tools such as React, MySQL, Sass, Redux, and HTML suite to create a 
                  seamless, responsive user interface and database, along with an encrypted user account management and privileged access system.
                  </li>
                  <li>
                    Developed an encrypted user account management system with privileged access control to safeguard user data.
                  </li>
                </ul>
              </div>
              <button className={styles.closeButton} onClick={() => {setExpandedCardIndex(null); closeAudio.current.play();}}>
                Close
              </button>
              <button className={styles.githubButton} onClick={(event) => {event.stopPropagation(); console.log('Button clicked'); window.open('https://github.com/menonsid2003/GameStore-Website', '_blank');}}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/640px-Octicons-mark-github.svg.png"></img>
              </button>
            </div>
          )}
        </li>
  
        <li
          ref={(el) => (elemsRef.current[1] = el as HTMLLIElement)}
          className={`${styles.carousel__item} ${expandedCardIndex === 1 ? styles.expanded : ''}`}
          data-pos="-1"
        >
          <img src="https://personalportfoliopublicassets.s3.us-east-1.amazonaws.com/stockapp.png" alt="Stock Analysis App" />
          <div className={styles.text}>Stock Analysis App</div>
          {expandedCardIndex === 1 && (
            <div className={styles.expandedContent}>
              <div className={styles.info}>
              <ul>
                <li>
                Developed a Windows Forms Application in C# based on Yahoo Finance data for the simultaneous and efficient comparison
                of multiple candlestick-style stock charts, using dynamic pattern recognition and trend analysis to map out over 1200 
                data points within searchable fiscal periods using object-oriented design.
                </li>
                </ul>
              </div>
              <button className={styles.closeButton} onClick={() => {setExpandedCardIndex(null); closeAudio.current.play();}}>
                Close
              </button>
              <button className={styles.githubButton} onClick={(event) => {event.stopPropagation(); console.log('Button clicked'); window.open('https://github.com/menonsid2003/StockDataVisualizer', '_blank');}}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/640px-Octicons-mark-github.svg.png"></img>
              </button>
            </div>
          )}
        </li>
  
        <li
          ref={(el) => (elemsRef.current[2] = el as HTMLLIElement)}
          className={`${styles.carousel__item} ${styles.carousel__item_active} ${expandedCardIndex === 2 ? styles.expanded : ''}`}
          data-pos="0"
        >
          <img src="https://personalportfoliopublicassets.s3.us-east-1.amazonaws.com/parkingbuddy.png" alt="Parking Buddy" />
          <div className={styles.text}>Parking Buddy</div>
          {expandedCardIndex === 2 && (
            <div className={styles.expandedContent}>
              <div className={styles.info}>
                <ul>
                  <li>
                  Created a Ruby on Rails web app using the Google Maps API to display a map of the university and parking lots,
                   showing available and taken spots, streamlining experiences for students, faculty, and visitors.
                  </li>
                  <li>
                  Adopted Agile methodologies and operated as a mock Scrum team with 4 members, holding 15 meetings over
                  3 months, leveraging GitHub for collaborative development, task management, testing, and version control to ensure efficient communication and project workflow.
                  </li>
                </ul>
              </div>
              <button className={styles.closeButton} onClick={() => {setExpandedCardIndex(null); closeAudio.current.play();}}>
                Close
              </button>
            </div>
          )}
        </li>
  
        <li
          ref={(el) => (elemsRef.current[3] = el as HTMLLIElement)}
          className={`${styles.carousel__item} ${expandedCardIndex === 3 ? styles.expanded : ''}`}
          data-pos="1"
        >
          <img src="https://personalportfoliopublicassets.s3.us-east-1.amazonaws.com/personalproject1.png" alt="this website!" />
          <div className={styles.text}>Personal Portfolio</div>
          {expandedCardIndex === 3 && (
            <div className={styles.expandedContent}>
              <div className={styles.info}>
                <ul>
                  <li>
                  Building a personal portfolio website using React and TypeScript, with a strong focus on design aesthetics,
                  responsive UI, and showcasing technical projects.
                  </li>
                  <li>
                  Deploying via AWS Amplify with S3 buckets for efficient asset management, incorporating clean code
                  architecture, component-based development, and future planned implementations for a professional online
                  presence.
                  </li>
                </ul>
              </div>
              <button className={styles.closeButton} onClick={() => {setExpandedCardIndex(null); closeAudio.current.play();}}>
                Close
              </button>
              <button className={styles.githubButton} onClick={(event) => {event.stopPropagation(); console.log('Button clicked'); window.open('https://github.com/menonsid2003/PersonalSite', '_blank');}}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/640px-Octicons-mark-github.svg.png"></img>
              </button>
            </div>
          )}
        </li>
  
        <li
          ref={(el) => (elemsRef.current[4] = el as HTMLLIElement)}
          className={`${styles.carousel__item} ${expandedCardIndex === 4 ? styles.expanded : ''}`}
          data-pos="2"
        >
          <img src="https://personalportfoliopublicassets.s3.us-east-1.amazonaws.com/carttDemo.png" alt="Description 5" />
          <div className={styles.text}>Wearable Active Tracker</div>
          {expandedCardIndex === 4 && (
            <div className={styles.expandedContent}>
              <div className={styles.info}>
                <ul>
                  <li>
                  Designed a wireless optical motion tracking system, using a Luxonis OAK D-Lite camera and computer vision to track spatial and orientational
                  data ( 6DOF ) for various objects in VR environments.
                  </li>
                  <li>
                  Utilized ArUco markers with a Unity application for hand and object tracking,
                  enabling accurate real-time interaction within the VR environment without the need for controllers.
                  </li>
                  <li>
                  Connected a Python WebSocket server running on a Raspberry Pi 4 to a Unity application with a C# WebSocket client, enabling real-time data transfer
                  between the camera and the VR environment.
                  </li>
                </ul>
              </div>
              <button className={styles.closeButton} onClick={() => {setExpandedCardIndex(null); closeAudio.current.play();}}>
                Close
              </button>
              <button className={styles.githubButton} onClick={(event) => {event.stopPropagation(); console.log('Button clicked'); window.open('https://github.com', '_blank');}}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/640px-Octicons-mark-github.svg.png"></img>
              </button>
            </div>
          )}
        </li>
      </ul>
    </div>
    </div>
  );
}

export default Card;

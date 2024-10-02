import React, { useEffect, useRef, useState } from 'react';
import styles from './carousel.module.scss';

const Card: React.FC = () => {
  const carouselListRef = useRef<HTMLUListElement | null>(null);
  const elemsRef = useRef<HTMLLIElement[]>([]);
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null); // Track which card is expanded

  useEffect(() => {
    const carouselList = carouselListRef.current;
    const elems = elemsRef.current;

    // Add an event listener for click events on the carousel
    const handleCarouselClick = (event: MouseEvent) => {
      const newActive = event.target as HTMLElement; // Cast to HTMLElement
      const isItem = newActive.closest(`.${styles.carousel__item}`) as HTMLElement;

      if (!isItem) {
        return;
      }

      // Find the current card in position 0
      const currentCardPos = elems.findIndex((elem) => elem && elem.dataset.pos === '0');

      if (isItem.dataset.pos === '0') {
        // If the clicked item is the active one (in position 0), toggle expansion
        if (currentCardPos !== -1) {
          setExpandedCardIndex((prevIndex) => (prevIndex === currentCardPos ? null : currentCardPos));
        }
      } else {
        // Collapse the expanded card when switching to another card
        setExpandedCardIndex(null);
        update(isItem as HTMLElement); // Cast to HTMLElement
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
  }, []);

  return (
    <div className={styles.carousel}>
      <ul className={styles.carousel__list} ref={carouselListRef}>
        <li
          ref={(el) => (elemsRef.current[0] = el as HTMLLIElement)}
          className={`${styles.carousel__item} ${expandedCardIndex === 0 ? styles.expanded : ''}`}
          data-pos="-2"
        >
          <img src="../assets/gamehaven.png" alt="Description 1" />
          <div className={styles.text}>Card 1</div>
          <p className={styles.info}>gaming gaming gaming</p>
        </li>
        <li
          ref={(el) => (elemsRef.current[1] = el as HTMLLIElement)}
          className={`${styles.carousel__item} ${expandedCardIndex === 1 ? styles.expanded : ''}`}
          data-pos="-1"
        >
          <img src="path_to_your_image2.jpg" alt="Description 2" />
          <div className={styles.text}>Card 2</div>
        </li>
        <li
          ref={(el) => (elemsRef.current[2] = el as HTMLLIElement)}
          className={`${styles.carousel__item} ${styles.carousel__item_active} ${expandedCardIndex === 2 ? styles.expanded : ''}`}
          data-pos="0"
        >
          <img src="../assets/parkingbuddy.png" alt="Parking Buddy" />
          <div className={styles.text}>Parking Buddy</div>
          {expandedCardIndex === 2 && (
            <div className={styles.expandedContent}>
              <p>Additional Information about Parking Buddy.</p>
              <button className={styles.closeButton} onClick={() => setExpandedCardIndex(null)}>
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
          <img src="path_to_your_image4.jpg" alt="Description 4" />
          <div className={styles.text}>Card 4</div>
        </li>
        <li
          ref={(el) => (elemsRef.current[4] = el as HTMLLIElement)}
          className={`${styles.carousel__item} ${expandedCardIndex === 4 ? styles.expanded : ''}`}
          data-pos="2"
        >
          <img src="path_to_your_image5.jpg" alt="Description 5" />
          <div className={styles.text}>Card 5</div>
        </li>
      </ul>
    </div>
  );
};

export default Card;

import React from 'react';
import styles from './navbar.module.scss';

interface NavbarProps {
  onButtonClick: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onButtonClick }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h1>Sidharth Menon</h1>
      </div>
      <div className={styles.navButtons}>
        <button
          className={styles.featuredBtn}
          onClick={() => onButtonClick('about')}
        >
          About
        </button>
        <button
          className={styles.featuredBtn}
          onClick={() => onButtonClick('featured')}
        >
          Featured
        </button>
        {/*<button
          className={styles.featuredBtn}
          onClick={() => onButtonClick('projects')}
        >
          Projects
        </button>*/}
        <button
          className={styles.featuredBtn}
          onClick={() => onButtonClick('contact')}
        >
          Contact
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

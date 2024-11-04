import React from 'react';
import styles from './navbar.module.scss';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h1 >Sid Menon</h1> {/* Use href for standard navigation */}
      </div>
      <ul className={styles.navLinks}>
      </ul>
      <div className={styles.navButtons}>
      </div>
    </nav>
  );
};

export default Navbar;

import styles from './App.module.css';
import Card from './components/carousel';
import MusicPlayer from './components/musicplayer';
import Navbar from './components/navbar';

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <img className={styles.spotlightimg} src="../assets/spotlight.png" alt="Spotlight" />
      <div className={styles.spotlight}> 
        <div></div>
        <div></div> {/* empty divs used for spotlight css animation*/}
      </div>
      <div className={styles.card}>
        <Card />
      </div>
      <div className={styles.musicplayer}>
        <MusicPlayer />
      </div>
    </div>
  );
}

export default App;

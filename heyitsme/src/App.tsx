import styles from './App.module.css';
import Card from './components/carousel';
import MusicPlayer from './components/musicplayer';

function App() {
  return (
    <div className={styles.App}>
      <img className={styles.spotlightimg} src="../assets/spotlight.png" alt="Spotlight" />
      <div className={styles.spotlight}> 
        <div></div>
        <div></div>
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

import styles from './App.module.css';
import Card from './components/carousel.tsx';


function App() {
  return (
    <div className={styles.App}>
      <img className={styles.spotlightimg} src="../assets/spotlight.png" alt="Spotlight" />
      <div className={styles.spotlight}> 
        <div></div>
        <div></div>
      </div>
      <Card />
    </div>
  );
}

export default App;

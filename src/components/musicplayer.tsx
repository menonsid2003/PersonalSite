import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './musicplayer.module.scss';

const albums = ["Color Your Night", "Me & You", "Electro Boy", "Home", "Proxy (Original Mix)"];
const trackNames = [
  "Azumi Takahashi, Lotus Juice - Persona 3 Reload",
  "Alex Skrindo - Me & You",
  "Kaaze - Electro Boy",
  "Jordan Schor - Home",
  "Martin Garrix - Proxy",
];
const albumArtworks = [
  "https://i.scdn.co/image/ab67616d0000b273e59bdb7ca29ddfcb23ec4bf6",
  "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_2.jpg",
  "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_3.jpg",
  "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_4.jpg",
  "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_5.jpg",
];
const trackUrl = [
  "../assets/coloryournight.mp3",
  "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/1.mp3",
  "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/3.mp3",
  "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/4.mp3",
  "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3",
];

const MusicPlayer: React.FC = () => {
  const [currIndex, setCurrIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("00:00");
  const [trackDuration, setTrackDuration] = useState<string>("00:00");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const seekBarRef = useRef<HTMLDivElement | null>(null);

  // Memoize handleNextTrack to prevent redefinitions
  const handleNextTrack = useCallback(() => {
    if (currIndex < albums.length - 1) {
      setCurrIndex(currIndex + 1);
      setIsPlaying(false);
    }
  }, [currIndex]);

  // Set up the audio instance
  // Set up the audio instance
useEffect(() => {
    const audio = audioRef.current;
    
    // Ensure audio is not null before accessing its properties
    if (audio) {
      audio.volume = 0.02; // Set volume
  
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('ended', handleNextTrack);
  
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  
    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('ended', handleNextTrack);
      }
    };
  }, [currIndex, isPlaying, handleNextTrack]); // Include handleNextTrack in the dependency array
  
  const playPause = () => {
    const audio = audioRef.current;
    
    // Check if audio is not null before attempting to play or pause
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  

  const updateTime = () => {
    const audio = audioRef.current;
    if (audio) {
      const curMinutes = Math.floor(audio.currentTime / 60);
      const curSeconds = Math.floor(audio.currentTime % 60);
      setCurrentTime(`${curMinutes < 10 ? "0" : ""}${curMinutes}:${curSeconds < 10 ? "0" : ""}${curSeconds}`);
      const durationMinutes = Math.floor(audio.duration / 60);
      const durationSeconds = Math.floor(audio.duration % 60);
      setTrackDuration(`${durationMinutes < 10 ? "0" : ""}${durationMinutes}:${durationSeconds < 10 ? "0" : ""}${durationSeconds}`);
      const progress = (audio.currentTime / audio.duration) * 100;
      if (seekBarRef.current) {
        seekBarRef.current.style.width = `${progress}%`;
      }
    }
  };

  const handlePreviousTrack = () => {
    if (currIndex > 0) {
      setCurrIndex(currIndex - 1);
      setIsPlaying(false); // Ensure player pauses before playing new track
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = trackUrl[currIndex];
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currIndex]); //adding isPlaying breaks the pause function, but not having it causes yellow squiggles?

  return (
<div data-testid="musicplayer-component" className={styles.appcover}>
      <div className={styles.albumArt + (isPlaying ? ` ${styles.rotating}` : '')}>
        <img src={albumArtworks[currIndex]} alt="Album Art" className="active" />
      </div>
   <div className={styles.player}>
   <div className={styles.playerTrack}>
      <div className={styles.albumName}>{albums[currIndex]}</div>
      <div className={styles.trackName}>{trackNames[currIndex]}</div>
      <div className={styles.trackTime}>
         <div className={styles.currentTime}>{currentTime}</div>
         <div className={styles.trackLength}>{trackDuration}</div>
      </div>
      <div className={styles.sArea} onClick={playPause}>
         <div className={styles.sHover}></div>
         <div ref={seekBarRef} className={styles.seekBar}></div>
      </div>
   </div>
   <div className={styles.playerContent}>
      <div className={styles.playerControls}>
         <div className={styles.control}>
            <div className={styles.button} onClick={handlePreviousTrack}>
               <i className="fas fa-backward"></i>
            </div>
         </div>
         <div className={styles.control}>
            <div className={styles.button} onClick={playPause}>
               <i className={isPlaying ? "fas fa-pause" : "fas fa-play"}></i>
            </div>
         </div>
         <div className={styles.control}>
            <div className={styles.button} onClick={handleNextTrack}>
               <i className="fas fa-forward"></i>
            </div>
         </div>
      </div>
   </div>
</div>
<audio ref={audioRef}></audio>
</div>  
);

};

export default MusicPlayer;

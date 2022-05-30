import React, {useState} from 'react'
import Player from './components/player';
import Song from './components/song';
import "./styles/app.scss";
import data from './pictures/util';

function App() {

  const[isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  return (
    <div className="App">
      <Song currentSong={currentSong}/>
      <Player setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSong={currentSong} songs={songs} setCurrentSong={setCurrentSong}/>
    </div>
  );
}

export default App;
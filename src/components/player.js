import React, {useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';



const Player = ({currentSong, isPlaying, setIsPlaying, songs, setCurrentSong}) => {


    const audioRef = useRef(null);


    const playSongHandler = () =>{
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }else{
           audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const timeUpdateHandler = (e) =>{
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({...songInfo, currentTime: current, duration})
    };

    const getTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }

    const[songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });

    const dragHandler = (e) =>{
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value})
    }

    const nextTrackHandler = (direction) =>{
        let currentindex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === 'skip-forward'){
            setCurrentSong(songs[(currentindex + 1)%songs.length]);
        }else if (direction === 'skip-back'){
            if((currentindex - 1)% songs.length === -1){
                setCurrentSong(songs[songs.length-1]);
                return;
            }
            setCurrentSong(songs[(currentindex - 1)%songs.length]);
        }
    }

    return(
        <div className='player'>
            <div className='time-control'>
                <p>{getTime(songInfo.currentTime)}</p>
                <input min={0}
                 max={songInfo.duration}
                 onChange={dragHandler}
                  value={songInfo.currentTime}
                   type='range' />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className='play-control'>
                <FontAwesomeIcon onClick={()=>nextTrackHandler('skip-back')} className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} /> 
                <FontAwesomeIcon onClick={()=>nextTrackHandler('skip-forward')} className="skip-forward" size="2x" icon={faAngleRight} />
            </div> 
            <audio onLoadedMetadata={timeUpdateHandler}
             onTimeUpdate={timeUpdateHandler}
              ref={audioRef} 
              src={currentSong.audio}></audio>
        </div>
    );
};

export default Player;
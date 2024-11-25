import { useEffect, useRef, useState } from 'react'
import checo from '../assets/checo-win.jpg'
import jalisco from '../assets/jalisco.png'
import mexicoFlag from '../assets/mexicoFlag.png'
import checoCorrido from '../assets/checoCorrido.mp3'
import './ChecoCelebration.css'

function ChecoCelebration(){
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef();

    useEffect(() => {
        if(audioRef.current){
            audioRef.current.play();
        }
    }, [])

    function togglePlayPause(){
        if(isPlaying){
            audioRef.current.pause();
        }
        else{
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }

    return (
        <div className="celebration-container">
            <img src={jalisco} alt="Jalisco!"/>
            <img src={checo} alt="Checo Wins!"/>
            <img src={mexicoFlag} alt="Mexico!"/>
            <audio ref={audioRef} src={checoCorrido} loop/>
            <button onClick={togglePlayPause} >
                {isPlaying ? 'Pause Music' : 'Play Music'}
            </button>
        </div>
    )
}

export default ChecoCelebration
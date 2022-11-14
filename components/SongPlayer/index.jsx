import { useEffect, useRef } from 'react'
import styles from './styles.module.css'
import { FaPlay } from 'react-icons/fa'
import stages from 'public/data/stages.json'
import { useStage } from 'hooks/useStage'
import { useSecondsRemaining } from 'hooks/useSecondsRemaining'

function AnimatedBars() {
    return (
        <div className={styles.bars}>
            <span className={styles.bar1} />
            <span className={styles.bar2} />
            <span className={styles.bar3} />
        </div>
    )
}


export function SongPlayer({ song, playing, setPlaying }) {

    const audioRef = useRef()
    const counterRef = useRef()
    const { stage } = useStage()
    const { setSeconds, resetSeconds } = useSecondsRemaining()

    useEffect(() => {
        audioRef.current = new Audio(song)
        const audio = audioRef.current
        
        return () => {
            audio && audio.pause()
            clearInterval(counterRef.current)
        }
    }, [song])

    const handlePlay = () => {
        if (song) {
            audioRef.current.play()
            counterRef.current = setInterval(updateSongTime, 10)
            setPlaying(true)
        }
    }

    const handleStop = () => {
        if (song) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
            setPlaying(false)
            resetSeconds()
            clearInterval(counterRef.current)
        }
    }

    const updateSongTime = () => {
        setSeconds(audioRef.current.currentTime)
        if (stages[stage] < audioRef.current.currentTime) handleStop()
    }


    return (
        <div className={styles.player} onClick={playing ? handleStop : handlePlay}>
            {playing ? <AnimatedBars /> : <FaPlay className={styles.playIcon} /> }
        </div>
    )
}
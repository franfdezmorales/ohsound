import { useState } from 'react'
import { SongPlayer } from 'components/SongPlayer'
import { TimerBar } from 'components/TimerBar'
import styles from './styles.module.css'
import { SearchSong } from 'components/SearchSong'
import { Button } from 'components/Button'
import { useStage } from 'hooks/useStage'
import stages from 'public/data/stages.json'
import { useSecondsRemaining } from 'hooks/useSecondsRemaining'
import { useSelectedSong } from 'hooks/useSelectedSong'
import { useUserSolutions } from 'hooks/useUserSolutions'

const formatSeconds = seconds => {
    if (seconds < 10) {
        return `0:0${Math.floor(seconds)}`
    }

    return `0:${Math.floor(seconds)}`
}

const getNextSeconds = stage => {

    if (stage < 4) {
        return stages[stage + 1] - stages[stage]
    }

    return 0
}


export function MusicController({ song }) {

    const [playing, setPlaying] = useState(false)
    const { stage } = useStage()
    const { seconds } = useSecondsRemaining()
    const { selectedSong } = useSelectedSong()
    const { addNewSolution } = useUserSolutions()

    const formattedSeconds = formatSeconds(seconds)
    const howMuchSeconds = getNextSeconds(stage)
    const { cachedSongDay: { track } } = song; 


    const handleSubmitSolution = async () => {
        const response = await fetch('api/checkSongSolution', {
            method: 'POST', 
            body: JSON.stringify({
                id: selectedSong.id
            })
        })
        const answer = await response.json()
        addNewSolution({
            name: selectedSong.formattedName, 
            failed: answer.failed
        })
    }

    const handleSkipSolution = () => {
        addNewSolution({
            name: 'Skipped', 
            failed: true
        })
    }

    return (
        <div className={styles.wrapper}>
            <TimerBar />
            <section className={styles.player}>
                <span className={styles.seconds}>{formattedSeconds}</span>
                <SongPlayer playing={playing} setPlaying={setPlaying} song={track.preview_url} />
                <span className={styles.seconds}>0:15</span>
            </section>
            <SearchSong />
            <section className={styles.buttons}>
                <Button disabled={stage >= 4} onClick={handleSkipSolution}>
                    {`Skip (+${howMuchSeconds}s)`}
                </Button> 
                <Button disabled={!selectedSong.id || stage === 5} secondary onClick={handleSubmitSolution}>
                    Submit
                </Button>
            </section>
        </div>
    )
}
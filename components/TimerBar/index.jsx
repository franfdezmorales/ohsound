import styles from './styles.module.css'
import { useStage } from 'hooks/useStage'
import stages from 'public/data/stages.json'
import { useSecondsRemaining } from 'hooks/useSecondsRemaining'

export function TimerBar() {

    const { stage } = useStage()
    const { seconds } = useSecondsRemaining()

    const currentXTime = ((seconds * 100) / 15) / 100
    const currentXMaxTime = ((stages[stage] * 100) / 15) / 100
    const formattedTime = currentXTime < 1 ? currentXTime : 1

    return (
        <div className={styles.bar}>
            <span className={styles.barSeparation} />
            <span className={styles.barSeparation} />
            <span className={styles.barSeparation} />
            <span className={styles.barSeparation} />
            <span className={styles.currentMaxTime} style={{ transform: `scaleX(${currentXMaxTime})` }} />
            <span className={styles.currentTime} style={{ transform: `scaleX(${formattedTime})` }}/>
        </div>
    )
}
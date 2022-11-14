import { useUserSolutions } from 'hooks/useUserSolutions'
import styles from './styles.module.css'
import { ItemSolution } from 'components/ItemSolution'

export function UserSolutions() {

    const { userSolutions } = useUserSolutions()

    return (
        <div className={styles.wrapper}>
            {userSolutions.map(solution => (
                <ItemSolution key={solution.id} id={solution.id} name={solution.name} failed={solution.failed} />
            ))}
        </div>
    )
}
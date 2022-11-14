import styles from './styles.module.css'



export function ItemSolution({id, name, failed}) {

    return (
        <div className={styles.item}>
            <span className={styles.fail}>{failed ? '❌' : '❓'}</span>
            <span className={styles.name}>{name !== '' ? name : `Attempt ${id + 1}`}</span>
        </div>
    )
}
import styles from './styles.module.css'

export function Spinner() {
    return <div className={styles[`lds-spinner`]}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
}
import { Navbar } from 'components/Navbar'
import styles from './styles.module.css'


export function AppLayout({ children }) {

    return (
        <div className={styles.wrapper}>
            <Navbar />
            <section className={styles.children}>
                {children}
            </section>
        </div>
    )
}
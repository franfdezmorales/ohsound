import styles from './styles.module.css'
import { ItemMenu } from 'components/ItemMenu'
import DATA_MENU from 'public/data/navmenu.json'
import { FeedbackButton } from 'components/FeedbackButton'

export function Navmenu() {

    return (
        <nav className={styles.wrapper}>
            <FeedbackButton />
            {
                DATA_MENU.map(item => (
                    <ItemMenu key={item.href} href={item.href} title={item.title} />
                ))
            }
        </nav>
    )
}
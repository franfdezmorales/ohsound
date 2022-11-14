import styles from './styles.module.css'
import Link from 'next/link'

export function ItemMenu({ title, href }) {

    return (
        <Link href={href}>
            <span className={styles.item}>{title}</span>
        </Link>
    )
}
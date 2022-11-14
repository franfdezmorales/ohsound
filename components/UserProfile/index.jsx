import styles from './styles.module.css'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { FiLogOut } from 'react-icons/fi'

export function UserProfile({ user: { email, name, image } }) {

    return (
        <div className={styles.wrapper}>
            <Image alt='photo' src={image} width={40} height={40} className={styles.photo} />
            <section className={styles.userInfo}>
                <span className={styles.name}>{name}</span>
                <span className={styles.email}>{email}</span>
            </section>
            <FiLogOut className={styles.logout} onClick={signOut}/>
        </div>
    )
}
import { Navmenu } from 'components/Navmenu'
import styles from './styles.module.css'
import Link from 'next/link'
import { LoginButton } from 'components/LoginButton'
import { useSession } from 'next-auth/react'
import { UserProfile } from 'components/UserProfile'

export function Navbar() {

    const { data: session } = useSession()

    return (
        <section className={styles.wrapper}>
            <Link href='/'>
                <span className={styles.title}>OHSOUND</span>
            </Link>
            <div className={styles.container}>
                <Navmenu />
                {session ? <UserProfile user={session.user} /> : <LoginButton />}
            </div>
        </section>
    )
}
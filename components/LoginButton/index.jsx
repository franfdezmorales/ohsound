import { Button } from 'components/Button'
import styles from './styles.module.css'
import { FaSpotify } from 'react-icons/fa'
import { signIn } from 'next-auth/react'

export function LoginButton() {

    return (
        <Button onClick={() => signIn('spotify')}>
            <FaSpotify size={20}/>
            <span className={styles.title}>Login with Spotify™️</span>
        </Button>
    )
}
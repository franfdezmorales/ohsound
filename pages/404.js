import styles from 'styles/404.module.css'
import Link from 'next/link'
import { Button } from 'components/Button'

export default function Error404() {


    return (
        <div className={styles.wrapper}>
            <h1>{`This page doesn't seem to exist :(`}</h1>
            <Link href='/'>
                <Button>
                    Back to main page
                </Button>
            </Link>
        </div>
    )
}

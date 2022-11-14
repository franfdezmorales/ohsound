import styles from './styles.module.css'
import { getFormattedImage } from 'utils/formatImage'
import { getFormattedArtists } from 'utils/formatArtists'
import Image from 'next/image'



export function Record({image, name, artists, date, link}) {


    const imageToShow = getFormattedImage(image, 'medium')
    const formattedArtists = getFormattedArtists(artists)

    return (
        <div className={styles.wrapper}>
            <a className={styles.link} href={link} target='_blank' rel='noopener nofollow noreferrer'>
                <Image src={imageToShow.url} width={200} height={200} alt='Image photo' className={styles.songImage} />
            </a>
            <span className={styles.title}>{name}</span>
            <span className={styles.artists}>{formattedArtists}</span>
            <span className={styles.date}>{date}</span>
        </div>
    )
}
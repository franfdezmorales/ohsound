import styles from './styles.module.css'
import { getFormattedArtists } from 'utils/formatArtists'
import { getFormattedImage } from 'utils/formatImage'
import Image from 'next/image';
import { FaSpotify } from 'react-icons/fa'
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti'

export function Solution({song}) {

    const { cachedSongDay: { track } } = song; 

    const [date, setDate] = useState('00:00:00')

    const image = getFormattedImage(track.album.images, 'medium')
    const formattedArtists = getFormattedArtists(track.artists)
    const formattedReleaseDate = new Date(track.album.release_date).getFullYear()
    
    useEffect(() => {
            confetti()
            const nextDate = new Date(Date.now())
            nextDate.setHours(0, 0, 0)

            const timerInterval = setInterval(() => {
                const timeRemaining = new Date(nextDate - Date.now())
                const formattedDate = timeRemaining.toISOString().substring(11, 19)
                setDate(formattedDate)
            }, 1000)

            return () => {
                clearInterval(timerInterval)
            }
    }, [])

    return (
        <div className={styles.wrapper}>
            <Image priority src={image.url} alt='Song image' width={image.width} height={image.height} />
            <span className={styles.title}>{track.name}</span>
            <span className={styles.artists}>{formattedArtists}</span>
            <span className={styles.date}>{formattedReleaseDate}</span>
            <a className={styles.link} href={track.external_urls.spotify} target='_blank' rel='noopener nofollow noreferrer'>
                <FaSpotify className={styles.icon} />
                <span className={styles.iconText}>Hear this song on Spotify</span>
            </a>
            <span className={styles.nextSound}>{`Next sound in ${date}`}</span>
        </div>
    )
}
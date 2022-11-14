import styles from './styles.module.css'
import { getFormattedArtists } from 'utils/formatArtists'


export function SongItem({id, name, artists, onClick}){

    const formattedArtists = getFormattedArtists(artists)
    const formattedName = `${name} - ${formattedArtists}`

    const handleSelect = () => {
        onClick({
            id, 
            formattedName
        })
    }
    
    return (
        <span className={styles.item} onClick={handleSelect}>
            {formattedName}
        </span>
    )
}
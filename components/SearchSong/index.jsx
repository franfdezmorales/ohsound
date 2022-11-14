import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { FiSearch } from 'react-icons/fi'
import { Input } from 'components/Input'
import { useSearchSongs } from 'hooks/useSearchSongs'
import { SongItem } from 'components/SongItem'
import { useSelectedSong } from 'hooks/useSelectedSong'


export function SearchSong() {


    const { songs, search, searchSongs } = useSearchSongs()
    const [mustShowList, setMustShowList] = useState(true)
    const { resetSelectedSong, updateSelectedSong } = useSelectedSong()
    const wrapperRef = useRef()

    const { value: searchValue } = search; 

    const handleShowList = () => {
        if (!search.mustSearch) {
            resetSelectedSong()
            searchSongs({value: '', mustSearch: false})
        }
        setMustShowList(true)
    }

    const handleClickOutside = (e) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            setMustShowList(false)
        }
    }
    
    const handleSelect = ({ id, formattedName }) => {
        updateSelectedSong({
            id, 
            formattedName
        })
        setMustShowList(false)
        searchSongs({value: formattedName, mustSearch: false})
    }

    const handleSearch = (e) => {
        const newSearch = e.target.value
        searchSongs({value: newSearch, mustSearch: true})
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)

        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [])

    return (
        <div ref={wrapperRef} className={styles.wrapper}>
            <FiSearch className={styles.icon} />
            <Input onFocus={handleShowList} value={searchValue} onChange={handleSearch} placeholder='Know it? Search for the title / artist' />
            {mustShowList && <section className={styles.list}>
                {songs.map(song => (
                    <SongItem key={`${song.id}-${searchValue}`} id={song.id} name={song.name} artists={song.artists} onClick={handleSelect} />
                ))}
            </section>}
        </div>
    )
}
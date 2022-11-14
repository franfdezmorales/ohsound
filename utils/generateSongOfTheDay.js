import { getSongs } from "lib/spotify"
import { addNewSong } from 'lib/firebase'

let cachedSongDay = {}

const generateSongOfTheDay = async () => {
    const { tracks: { items: songs } } = await getSongs()
    const totalSongs = songs.length
    const randomIndex = Math.floor(Math.random() * totalSongs - 1)
    const formattedSongs = Object.values(songs)
    const daySong = formattedSongs[randomIndex]
    addNewSong(daySong)
    return daySong
}


export const getSongOfTheDay = async () => {
    const currentDay = new Date().getDate()
    if (currentDay === cachedSongDay.lastDay) return cachedSongDay

    const daySong = await generateSongOfTheDay()

    cachedSongDay = {
        track: daySong, 
        lastDay: new Date().getDate()
    }

    return cachedSongDay
}
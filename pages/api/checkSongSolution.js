import { getSongOfTheDay } from "utils/generateSongOfTheDay"




export default async function handler(req, res) {

    if (req.method !== 'POST') return res.status(403).end()

    
    try {
        const { track: daySong } = await getSongOfTheDay()
        const submittedSong = JSON.parse(req.body)
    
        if (daySong.id !== submittedSong.id) return res.status(200).json({ failed: true })
    
        return res.status(200).json({ failed: false })
        
    } catch(err) {
        res.status(403).end()
    }
}
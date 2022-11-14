import { getSongOfTheDay } from 'utils/generateSongOfTheDay'


export default async function handler(req, res) {

    const cachedSongDay = await getSongOfTheDay()

    return res.status(200).json({cachedSongDay})
}
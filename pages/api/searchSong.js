import { getSearchSongs } from "lib/spotify"

const cachedSearchs = new Map()

export default async function handler(req, res) {

    try {
        const { search } = JSON.parse(req.body)

        if (cachedSearchs.has(search)) {
            const cachedSongs = cachedSearchs.get(search)
            return res.status(200).json(cachedSongs)
        } 

        const { tracks: { items: songs } } = await getSearchSongs(search)
        cachedSearchs.set(search, songs) 
        return res.status(200).json(songs)

    } catch(err) {

        console.log(err)
        return res.status(200).json([])
    }

}
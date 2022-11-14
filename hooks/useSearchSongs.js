import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";

const defaultSongs = atom({
    key: 'searchSongs', 
    default: []
})


export const useSearchSongs = () => {

    const [ songs, setSongs ] = useRecoilState(defaultSongs)
    const [ search, setSearch ] = useState({value: '', mustSearch: true})



    useEffect(() => {
        (async () => {
            if (search.value !== '' && search.mustSearch) {
                const response = await fetch('/api/searchSong', {
                    method: 'POST', 
                    body: JSON.stringify({
                        search: search.value
                    })
                })
                const searchSongs = await response.json()
                setSongs(searchSongs)
            } else {
                setSongs([])
            }
        })();

    }, [search, setSongs])


    const searchSongs = ({value, mustSearch}) => {
        setSearch({value, mustSearch})
    }


    return {
        songs, 
        search, 
        searchSongs
    }


}
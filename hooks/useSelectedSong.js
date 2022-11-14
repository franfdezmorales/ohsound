import { atom, useRecoilState } from "recoil";

const defaultSong = atom({
    key: 'selectedSong', 
    default: {}
})


export const useSelectedSong = () => {

    const [selectedSong, setSelectedSong] = useRecoilState(defaultSong)

    const resetSelectedSong = () => {
        setSelectedSong({})
    }

    const updateSelectedSong = (newSong) => {
        setSelectedSong(newSong)
    }

    return {
        selectedSong, 
        resetSelectedSong, 
        updateSelectedSong
    }

}
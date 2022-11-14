import useSWR from "swr"




export const useSong = () => {

    const { data, error } = useSWR('/api/songDay')

    return {
        song: data, 
        loading: !data, 
        error
    }
}
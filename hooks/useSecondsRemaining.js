import { atom, useRecoilState } from 'recoil'

const defaultSeconds = atom({
    key: 'seconds', 
    default: 0
})


export const useSecondsRemaining = () => {

    const [seconds, setSeconds] = useRecoilState(defaultSeconds)


    const resetSeconds = () => {
        setSeconds(0)
    }

    return {
        seconds, 
        setSeconds, 
        resetSeconds
    }
}
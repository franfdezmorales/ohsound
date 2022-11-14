import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { useUserSolutions } from './useUserSolutions'

const defaultStage = atom({
    key: 'stage', 
    default: 0
})

const getCurrentStage = (solutions) => {

    if (!solutions) return 0
    
    for (let i = 0; i < solutions.length; i++) {
        const solution = solutions[i]
        if (solution.name === '') return i
    }

    return solutions.length
}

export const useStage = () => {

    const [stage, setStage] = useRecoilState(defaultStage)
    const { userSolutions } = useUserSolutions()

    useEffect(() => {
        const currentStage = getCurrentStage(userSolutions)
        setStage(currentStage)
    }, [userSolutions, setStage])

    const resetStage = () => {
        setStage(0)
    }


    return {
        stage, 
        resetStage
    }
}
import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'


const defaultSolutions = Array.from({ length: 5 }, (v, i) => ({
    id: i, 
    name: '', 
    failed: false
}))

const defaultUserSolutions = atom({
    key: 'userSolutions', 
    default: defaultSolutions
})

const defaultSolution = atom({
    key: 'solution', 
    default: false
})

const getCurrentIndex = (array) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].name === '') return i
    }

    return 0
}

const timeExpired = (date) => {
    if (!date) return false
    const { nextDate } = date;
    const expiredDate = new Date(nextDate)
    expiredDate.setHours(0, 0, 0)
    return expiredDate <= new Date(Date.now()).getDate()
}

export const useUserSolutions = () => {

    const [userSolutions, setUserSolutions] = useRecoilState(defaultUserSolutions)
    const [findSolution, setFindSolution] = useRecoilState(defaultSolution)


    const addNewSolution = ({name, failed}) => {
        const currentIndex = getCurrentIndex(userSolutions)
        const newSolutions = [...userSolutions]
        let solution = newSolutions[currentIndex]
        solution = {...solution, name}
        solution = {...solution, failed}
        newSolutions[currentIndex] = solution
        setUserSolutions(newSolutions)
        localStorage.setItem('solutions', JSON.stringify(newSolutions))
        if (!failed) {
            localStorage.setItem('solutionFind', 'true')
            setFindSolution(true)
        }
        const nextDate = new Date(Date.now())
        nextDate.setDate(nextDate.getDate() + 1)
        localStorage.setItem('expiresIn', JSON.stringify({nextDate}))
    }


    useEffect(() =>{
        const expiresIn = JSON.parse(localStorage.getItem('expiresIn'))
        if (timeExpired(expiresIn)) localStorage.clear()
        const solutions = localStorage.getItem('solutions') 
        const parsedSolutions = JSON.parse(solutions) ?? defaultSolutions
        const findSolution = localStorage.getItem('solutionFind')
        setUserSolutions(parsedSolutions)
        setFindSolution(Boolean(findSolution))
    }, [])

    return {
        findSolution,
        userSolutions, 
        addNewSolution
    }
}
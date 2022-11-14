import { MusicController } from "components/MusicController"
import { Solution } from "components/Solution"
import { UserSolutions } from "components/UserSolutions"
import { useSong } from "hooks/useSong"
import { useUserSolutions } from "hooks/useUserSolutions"
import styles from 'styles/Home.module.css'

export default function Home() {

  const { song, loading, error } = useSong()
  const { findSolution } = useUserSolutions()

  if (loading) return null

  return (
    <div className={styles.page}>
      {findSolution ? 
        <Solution song={song} />
      :
      <>
        <div className={styles.wrapper}>
          <UserSolutions />
        </div>
        <MusicController song={song} />
      </>
      }
    </div>
  )
}

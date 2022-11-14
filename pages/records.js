import { Record } from 'components/Record'
import { getRecordSongs } from 'lib/firebase'
import styles from 'styles/Records.module.css'



export default function Records({ records }) {

    return (
        <div className={styles.wrapper}>
            {records.map((record) => (
                <Record key={record.track.id} name={record.track.name} image={record.track.album.images} artists={record.track.artists} date={record.date} link={record.track.external_urls.spotify} />
            ))}
        </div>
    )

}




export async function getServerSideProps(context) {

    const records = await getRecordSongs()

    return {
        props: {
            records
        }
    }
}
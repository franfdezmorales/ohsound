import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
}


const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const db = getFirestore(firebaseApp)




export const addNewSong = async (song) => {
    const docRef = await addDoc(collection(db, 'songs'), {
        date: new Date(), 
        track: song
    })
}

export const getRecordSongs = async () => {
    const q = query(collection(db, 'songs'), orderBy('date'))
    
    const querySnapshot = await getDocs(q)
    let songs = []
    querySnapshot.forEach(doc => {
        const song = doc.data()
        songs.push({...song, date: new Date((song.date.seconds * 1000) + (song.date.nanoseconds / 1000000)).toLocaleDateString()})
    })

    return songs
}

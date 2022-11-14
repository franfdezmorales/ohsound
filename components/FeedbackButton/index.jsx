import { useState } from 'react'
import { FeedbackForm } from './FeedbackForm'
import styles from './styles.module.css'


export function FeedbackButton() {

    const [editMode, setEditMode] = useState(false)

    const handleOpen = () => {
        setEditMode(true)
    }

    const handleClose = () => {
        setEditMode(false)
    }

    return (
        <div className={styles.wrapper}>
            <span className={styles.fbutton} onClick={handleOpen}>Feedback</span>
            {editMode && <FeedbackForm onClose={handleClose} />}
        </div>
    )
}
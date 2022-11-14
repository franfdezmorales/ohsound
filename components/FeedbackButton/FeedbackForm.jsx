import { Formik, Form, Field } from 'formik'
import styles from './styles.module.css'
import { Input } from 'components/Input'
import { TextArea } from 'components/TextArea'
import { Button } from 'components/Button'
import { EmojiRadioButton } from 'components/EmojiRadioButton'
import FEEDBACK_EMOJI from 'public/data/feedbackEmoji.json'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Spinner } from 'components/Spinner'

export function FeedbackForm({ onClose }) {

    const ref = useRef()
    const [emojiFeedback, setEmojiFeedback] = useState(FEEDBACK_EMOJI)
    const [alert, setAlert] = useState({type: '', message: '', description: ''})
    const [isLoading, setIsLoading] = useState(false)

    const handleOnClick = (id) => {
        const newEmojiFeedback = [...emojiFeedback]
        for (let i = 0; i < newEmojiFeedback.length; i++) {
            newEmojiFeedback[i]['selected'] = false
            if (newEmojiFeedback[i]['id'] === id) { newEmojiFeedback[i]['selected'] = true }
        }
        setEmojiFeedback(newEmojiFeedback)
    }

    const handleClickOutside = useCallback((e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            onClose && onClose()
        }
    }, [onClose])

    const handleResetAlert = () => {
        setAlert({type: '', message: '', description: ''})
    }

    const handleSubmit = async ({ name, feedback }) => {
        setIsLoading(true)
        const response = await fetch('/api/sendFeedback', {
            method: 'POST', 
            body: JSON.stringify({
                name, 
                feedback, 
                ranking: emojiFeedback
            })
        })
        setIsLoading(false)
        if (response.status === 200) {
            setAlert({type: 'successful', message: 'Form successfully submitted.', description: 'Thank you very much for your feedback, we will work as much as possible to implement your comments.'})
        } else {
            setAlert({type: 'error', message: 'An error has occurred.', description: 'While sending your feedback an error occurred that we don\'t know about, please try again.'})
        }

    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)

        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [handleClickOutside])

    return (
        <div className={styles.form} ref={ref}>
            <span className={styles.title}>Feedback</span>
            {alert.message !== '' ?
                <div className={styles.alert}>
                    <span className={styles[`titleAlert-${alert.type}`]}>{alert.message}</span>
                    <span className={styles[`descriptionAlert`]}>{alert.description}</span>
                    <section className={styles.buttons}>
                        <Button secondary onClick={onClose}>
                            <span className={styles.titleButton}>Close</span>
                        </Button>
                        <Button onClick={handleResetAlert}>
                            <span className={styles.titleButton}>Go back</span>
                        </Button>
                    </section>
                </div>
                : 
            <Formik
                initialValues={{ name: "", feedback: "" }}
                onSubmit={values => {
                    if (values.name === '' || values.feedback === '') {
                        setAlert({type: 'error', message: 'An error has occurred.', description: 'You cannot send the form without filling in all the fields.'})
                    } else {
                        handleSubmit(values)
                    }
                }}
            >
                <Form autoComplete='off' className={styles.customForm}>
                    <Field name="name" placeholder='Your name' type='text' component={Input} />
                    <Field name="feedback" placeholder='Your feedback...' component={TextArea} />
                    <div className={styles.buttonSection}>
                        <div className={styles.emojiPicker}>
                            {emojiFeedback.map(item => (
                                <EmojiRadioButton key={item.id} emoji={item} onClick={handleOnClick} />
                            ))}
                        </div>
                        <Button type="submit">
                            {isLoading ? <Spinner /> : <span className={styles.titleButton}>Submit</span>}
                        </Button>
                    </div>
                </Form>
            </Formik>}
        </div>
    )
}
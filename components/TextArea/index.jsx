import styles from './styles.module.css'



export function TextArea({ field, form, ...props }) {

    return (
        <textarea {...field} {...props} className={styles.customTextArea} />
    )
}
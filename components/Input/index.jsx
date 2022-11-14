import styles from './styles.module.css'


export function Input({ field, form, ...props }) {

    return (
        <input {...field} {...props} className={styles.customInput} />
    )
}
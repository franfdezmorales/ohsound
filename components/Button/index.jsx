import styles from './styles.module.css'


export function Button({ secondary, children, onClick, disabled, type='button' }) {

    return (
        <button disabled={disabled} type={type} className={styles[`wrapper-${secondary ? 'secondary' : 'primary'}`]} onClick={onClick}>
            {children}
        </button>
    )
}
import styles from './styles.module.css'


export function EmojiRadioButton({ emoji, onClick }) {
    return (
        <span className={styles[`emoji-${emoji.selected ? 'selected' : 'no-selected'}`]} onClick={() => onClick(emoji.id)}>{emoji.emojiToRender}</span>
    )
}
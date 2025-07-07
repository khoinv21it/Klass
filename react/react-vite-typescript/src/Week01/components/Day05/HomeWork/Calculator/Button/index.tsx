import React from 'react'
import styles from './Button.module.css'

type Props = {
  text: string
  background?: string
  onClick: () => void
}

export default function Button({ text, background = '#fff', onClick }: Props) {
  return (
    <button
      className={styles.button}
      style={{ backgroundColor: background }}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

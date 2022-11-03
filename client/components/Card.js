import React, { Children } from 'react'
import styles from '../styles/Card.module.css'

export default function Card({ title, list_state, children }) {

  if (title === undefined) {
    return;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

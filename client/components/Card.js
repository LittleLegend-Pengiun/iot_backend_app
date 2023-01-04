import React from 'react'
import { useSelector } from "react-redux";

export default function Card({ title, children }) {

  const Styles = (useSelector(state => state.theme)).value().card;

  if (title === undefined) {
    return;
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.title}>{title}</div>
      <div className={Styles.content}>
        {children}
      </div>
    </div>
  )
}

import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { changeToLi, changeToDar } from "../feature/darkmodeSlice";
import { useEffect } from "react";
import styles from '../styles/light/Card.module.css'
import styles2 from '../styles/dark/Card.module.css'

// Used to store darkmode state
var darkst = 0;

export default function Card({ title, list_state, children }) {


  {/* Change Dark Mode Block ================================================================================== */ }
  {/* ========================================================================================================= */ }
  const DM = useSelector(state => state.darkmode);
  const dispatch2 = useDispatch();

  useEffect(() => {
    {/* Get Dark or Light mode from LocalStorage. 0 = Light, 1 = Dark */ }
    darkst = localStorage.getItem("darkstate");
    {/* Set Darkmode by dispatch based on darkstate data from localstorage */ }
    changeDmode(darkst);
  }, [])

  {/* Function to switch darkmode */ }
  const changeDmode = (lang) => {
    switch (lang) {
      case "0":
        dispatch2(changeToLi())
        break
      case "1":
        dispatch2(changeToDar())
        break
    }
  }
  {/* Change Dark Mode Block ================================================================================== */ }
  {/* ========================================================================================================= */ }


  if (title === undefined) {
    return;
  }

  return (
    <div className={darkst == 0 ? styles.container : styles2.container}>
      <div className={darkst == 0 ? styles.title : styles2.title}>{title}</div>
      <div className={darkst == 0 ? styles.content : styles2.content}>
        {children}
      </div>
    </div>
  )
}

import styles from "../styles/light/StatisticContent.module.css";
import styles2 from "../styles/dark/StatisticContent.module.css";
import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { changeToVi, changeToEng } from "../feature/languageSlice";
import { changeToLi, changeToDar } from "../feature/darkmodeSlice";
import { useEffect } from "react";

// Used to store darkmode state
var darkst = 0;

export default function StatisticContent({ data, max, min, avg }) {

  {/* Change Dark Mode and Language Block ===================================================================== */ }
  {/* ========================================================================================================= */ }
  const Lang = useSelector(state => state.language);
  const DM = useSelector(state => state.darkmode);
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();

  useEffect(() => {
    {/* Get language state from localstorage, change language by dispatch and set drop box value */ }
    const iniLanguage = localStorage.getItem('language');
    changeLang(iniLanguage);
    const selectedOption = document.getElementById(iniLanguage);
    if (selectedOption != null) { selectedOption.setAttribute("selected", "") };
    {/* Get Dark or Light mode from LocalStorage and change language by dispatch. 0 = Light, 1 = Dark */ }
    darkst = localStorage.getItem("darkstate");
    changeDmode(darkst);
  }, [])

  {/* Function to switch language */ }
  const changeLang = (lang) => {
    switch (lang) {
      case "vi":
        dispatch(changeToVi())
        break
      case "eng":
        dispatch(changeToEng())
        break
    }
  }

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
  {/* Change Dark Mode and Language Block ===================================================================== */ }
  {/* ========================================================================================================= */ }


  return (
    <div className={darkst == 0 ? styles.container : styles2.container}>
      <div className={darkst == 0 ? styles.item : styles2.item}>
        <a id={darkst == 0 ? styles.chartstyle : styles2.chartstyle}>
          <Line data={data} width={400} height={400} options={options} />
        </a>
        <div className={styles.avgbox}>
          <p>
            <a className={styles.avgboxl}>{Lang.value().max}: &nbsp;</a>
            <a className={styles.avgboxr}>{max}</a>
          </p>
          <p>
            <a className={styles.avgboxl}>{Lang.value().min}: &nbsp;</a>
            <a className={styles.avgboxr}>{min}</a>
          </p>
          <p>
            <a className={styles.avgboxl}>{Lang.value().average}: &nbsp;</a>
            <a className={styles.avgboxr}>{avg}</a>
          </p>
        </div>
      </div>
    </div>
  )
}

{/* Chart option Block ====================================================================================== */ }
{/* ========================================================================================================= */ }
const options = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    x: {
      ticks: {
        display: false,
      },
      grid: {
        display: false,
        drawBorder: false,
      }
    },
    y: {
      ticks: {
        display: false,
      },
      grid: {
        drawBorder: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#fff',
      bodyColor: 'black',
      padding: 8,
      titleColor: 'black',
      displayColors: false,
      bodyFont: {
        family: 'Arial',
        size: '15',
      },
      titleFont: {
        family: 'Arial',
        size: '15',
      },
    },
  },
};
{/* Chart option Block ====================================================================================== */ }
{/* ========================================================================================================= */ }
import styles from "../styles/light/StatisticContent.module.css";
import styles2 from "../styles/dark/StatisticContent.module.css";
import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { changeToVi, changeToEng } from "../feature/languageSlice";
// import { changeToLi, changeToDar } from "../feature/darkmodeSlice";
import { useEffect } from "react";

var darkst = 0;

export default function StatisticContent({ data, max, min, avg }) {

  {/* Change Dark Mode and Language Block */ }
  {/* ========================================================================================================= */ }
  const Lang = useSelector(state => state.language);
  const Styles = (useSelector(state => state.theme)).value().statisticContent;

  
  return (
    <div className={Styles.container}>
      <div className={Styles.item}>
        <a id={Styles.chartstyle}>
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
import styles from "../styles/StatisticContent.module.css";
import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureLow, faDroplet, faLightbulb, faPersonBooth, faFan } from "@fortawesome/free-solid-svg-icons";

export default function StatisticContent({ data, max, min, avg }) {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <a id={styles.chartstyle}>
          <Line data={data} width={400} height={400} options={options} />
        </a>
        <div className={styles.avgbox}>
          <p>
            <a className={styles.avgboxl}>Cao nhất: &nbsp;</a>
            <a className={styles.avgboxr}>{max}</a>
          </p>
          <p>
            <a className={styles.avgboxl}>Thấp nhất: &nbsp;</a>
            <a className={styles.avgboxr}>{min}</a>
          </p>
          <p>
            <a className={styles.avgboxl}>Trung bình: &nbsp;</a>
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
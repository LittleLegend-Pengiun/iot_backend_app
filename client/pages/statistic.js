import Card from "../components/Card"
import Layout from "../layout/layout"
import styles from "../styles/Statistic.module.css"
import StatisticContent from "../components/StatisticContent"
import axios from 'axios';
import { useEffect, useState } from "react";
import initResponsiveChartDataListener from "../components/ResponsiveChartData";
import { useSocketContext } from "../context/appWrapper";
import { ServerUrl } from "../components/variable";

export default function Statistic({ data }) {
  let temparrname = [];
  let temparrvalue = [];
  let humarrname = [];
  let humarrvalue = [];

  for (let value of data["temp"]) {
    temparrname.push(value[0])
    temparrvalue.push(value[1])
  }

  for (let value of data["humi"]) {
    humarrname.push(value[0])
    humarrvalue.push(value[1])
  }

  const [state, setState] = useState({
    temparrname: temparrname,
    temparrvalue: temparrvalue,
    humarrname: humarrname,
    humarrvalue: humarrvalue,
    datatemp: datatemp,
    datahumid: datahumid
  })

  const socket = useSocketContext();
  useEffect(() => {
    initResponsiveChartDataListener(state, setState, socket);
  }, [])
  const datatemp = {
    labels: state.temparrname,
    datasets: [
      {
        label: '',
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: '#515bc2',
        pointBorderColor: 'red',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'red',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 100,
        data: state.temparrvalue,
      }
    ]
  };

  const datahumid = {
    labels: state.humarrname,
    datasets: [
      {
        label: '',
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: '#515bc2',
        pointBorderColor: 'red',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'red',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 100,
        data: state.humarrvalue,
      }
    ]
  };


  return (<div className={styles.page}>
    <div className={styles.card}>
      <Card title="Nhiệt độ">
        <StatisticContent data={state.datatemp} max={getmaxx(state.temparrvalue) + " °C"} min={getminn(state.temparrvalue) + " °C"} avg={getavg(state.temparrvalue) + " °C"}></StatisticContent>
      </Card>
      <Card title="Độ ẩm">
        <StatisticContent data={state.datahumid} max={getmaxx(state.humarrvalue) + " %"} min={getminn(state.humarrvalue) + " %"} avg={getavg(state.humarrvalue) + " %"}></StatisticContent>
      </Card>
    </div>
  </div >)
}


Statistic.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export async function getServerSideProps(context) {
  // console.log(parsedCookies);
  const res = await axios.get(`${ServerUrl}get-all-chart-data/0`, {
    headers: {
      Cookie: context.req.headers.cookie
    }
  });
  // console.log(res.data.isError);
  if (res.data.isError) {
    return {
      redirect: {
        permanent: false,
        destination: "/login"
      }
    }
  }
  return {
    props: { data: res.data }
  };
}

function getmaxx(dataarray) {
  let a = Math.max.apply(Math, dataarray);
  return a;
}

function getminn(dataarray) {
  let a = Math.min.apply(Math, dataarray);
  return a;
}

function getavg(dataarray) {
  let sum = 0;
  for (let i of dataarray) {
    sum += parseInt(i);
  }
  return (sum / dataarray.length).toFixed(1);
}
import Card from "../components/Card"
import Layout from "../layout/layout"
import StatisticContent from "../components/StatisticContent";
import { useSelector } from "react-redux";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useSocketContext } from "../context/appWrapper";
import { ServerUrl } from "../components/variable";
import initResponsiveChartDataListener from "../components/ResponsiveChartData";

// const dataHouseState = [{ key: "temp", name: "Nhiệt độ", val: "35 °C" }, { key: "humid", name: "Độ ẩm", val: "76 %" }]



export default function Statistic({ data }) {
  const Lang = useSelector(state => state.language);
  const Styles = (useSelector(state => state.theme)).value().statistic;

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

  const datatemp = {
    labels: temparrname,
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
        data: temparrvalue,
      }
    ]
  };

  const datahumid = {
    labels: humarrname,
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
        data: humarrvalue,
      }
    ]
  };

  const [state, setState] = useState({
    temparrname: temparrname,
    humarrname: humarrname,
    humarrvalue: humarrvalue,
    datatemp: datatemp,
    datahumid: datahumid
  })

  const socket = useSocketContext();
  useEffect(() => {
    initResponsiveChartDataListener(state, setState, socket);
  }, [])

  return (<div className={Styles.page}>
    <div className={Styles.card}>
      <Card title={Lang.value().temperature}>
        <StatisticContent data={state.datatemp} max={getmaxx(temparrvalue) + " °C"} min={getminn(temparrvalue) + " °C"} avg={getavg(temparrvalue) + " °C"}></StatisticContent>
      </Card>
      <Card title={Lang.value().humidity}>
        <StatisticContent data={state.datahumid} max={getmaxx(humarrvalue) + " %"} min={getminn(humarrvalue) + " %"} avg={getavg(humarrvalue) + " %"}></StatisticContent>
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
  var a = Math.max.apply(Math, dataarray);
  return a;
}

function getminn(dataarray) {
  var a = Math.min.apply(Math, dataarray);
  return a;
}


function getavg(dataarray) {
  let sum = 0;
  for (let i of dataarray) {
    sum += parseInt(i);
  }
  return (sum / dataarray.length).toFixed(1);
}
import Card from "../components/Card"
import Layout from "../layout/layout"
import StatisticContent from "../components/StatisticContent"
import {useSelector } from "react-redux";

// const dataHouseState = [{ key: "temp", name: "Nhiệt độ", val: "35 °C" }, { key: "humid", name: "Độ ẩm", val: "76 %" }]



export default function Statistic() {

  const Lang = useSelector(state => state.language);
  const Styles = (useSelector(state => state.theme)).value().statistic;

  return (<div className={Styles.page}>
    <div className={Styles.card}>
      <Card title={Lang.value().temperature}>
        <StatisticContent data={datatemp} max={getmaxx(temparrvalue) + " °C"} min={getminn(temparrvalue) + " °C"} avg={getavg(temparrvalue) + " °C"}></StatisticContent>
      </Card>
      <Card title={Lang.value().humidity}>
        <StatisticContent data={datahumid} max={getmaxx(humarrvalue) + " %"} min={getminn(humarrvalue) + " %"} avg={getavg(humarrvalue) + " %"}></StatisticContent>
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


//Temperature and Humidity array ===========================================

var temparrname = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
var temparrvalue = [28, 30, 35, 25, 26, 32, 24];
var humarrname = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
var humarrvalue = [60, 65, 58, 66, 61, 59, 57];

//==========================================================================


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


function getmaxx(dataarray) {
  var a = Math.max.apply(Math, dataarray);
  return a;
}

function getminn(dataarray) {
  var a = Math.min.apply(Math, dataarray);
  return a;
}

function getavg(dataarray) {
  var a = dataarray.reduce((a, b) => a + b, 0) / dataarray.length;
  a = a.toFixed(1);
  return a;
}
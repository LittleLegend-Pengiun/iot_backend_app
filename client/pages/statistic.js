import Card from "../components/Card"
import Layout from "../layout/layout"
import StatisticContent from "../components/StatisticContent";
import { useSelector } from "react-redux";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useSocketContext } from "../context/appWrapper";
import { ServerUrl } from "../components/variable";
import initResponsiveChartDataListener from "../components/ResponsiveChartData";
import styles from "../styles/light/StatisticContent.module.css";
// const dataHouseState = [{ key: "temp", name: "Nhiệt độ", val: "35 °C" }, { key: "humid", name: "Độ ẩm", val: "76 %" }]


export default function Statistic({ data }) {
  const Lang = useSelector(state => state.language);
  const Styles = (useSelector(state => state.theme)).value().statistic;

  const drawPoint = (labelName, dataSet) => {
    return {
      labels: labelName,
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
          data: dataSet,
        }
      ]
    };
  }

  let temparrname = [];
  let temparrvalue = [];
  let humarrname = [];
  let humarrvalue = [];
  let gasarrname = [];
  let gasarrvalue = [];

  for (let value of data["temp"]) {
    temparrname.push(value[0])
    temparrvalue.push(value[1])
  }

  for (let value of data["humi"]) {
    humarrname.push(value[0])
    humarrvalue.push(value[1])
  }

  for (let value of data["gas"]) {
    gasarrname.push(value[0])
    gasarrvalue.push(value[1])
  }

  const datatemp = drawPoint(temparrname, temparrvalue)
  const datahumid = drawPoint(humarrname, humarrvalue)
  const datagas = drawPoint(gasarrname, gasarrvalue)

  const [state, setState] = useState({
    temparrname: temparrname,
    humarrname: humarrname,
    gasarrname: gasarrname,
    humarrvalue: humarrvalue,
    temparrvalue: temparrvalue,
    gasarrvalue: gasarrvalue,
    datatemp: datatemp,
    datahumid: datahumid,
    datagas: datagas,
  })

  const socket = useSocketContext();

  //=====================

  const feedKey = {
    temp: "Tez0106/feeds/bbc-temp",
    humi: "Tez0106/feeds/bbc-humi",
    gas: "Tez0106/feeds/bbc-gas"
  };




  socket.on('new_data', (msg) => {
    console.log("State in socket before update")
    console.log(state)
    if (msg.feedID == feedKey.temp || msg.feedID == feedKey.humi || msg.feedID == feedKey.gas) {
      let newstate = null;
      newstate = {
        temparrname: [...state.temparrname],
        temparrvalue: [...state.temparrvalue],
        humarrname: [...state.humarrname],
        humarrvalue: [...state.humarrvalue],
        gasarrname: [...state.gasarrname],
        gasarrvalue: [...state.gasarrvalue],
      };

      if (msg.feedID == feedKey.temp) {
        newstate["temparrname"] = newstate.temparrname.concat([msg.data.created_at]);
        newstate["temparrvalue"] = newstate.temparrvalue.concat([msg.data.value]);
      }
      else if (msg.feedID == feedKey.humi) {
        newstate["humarrname"] = newstate.humarrname.concat([msg.data.created_at]);
        newstate["humarrvalue"] = newstate.humarrvalue.concat([msg.data.value]);
      }
      else if (msg.feedID == feedKey.gas) {
        newstate["gasarrname"] = newstate.gasarrname.concat([msg.data.created_at]);
        newstate["gasarrvalue"] = newstate.gasarrvalue.concat([msg.data.value]);
      }

      const datatemp = drawPoint(newstate.temparrname, newstate.temparrvalue);
      const datahumid = drawPoint(newstate.humarrname, newstate.humarrvalue);
      const datagas = drawPoint(newstate.gasarrname, newstate.gasarrvalue);

      newstate["datatemp"] = datatemp;
      newstate["datahumid"] = datahumid;
      newstate["datagas"] = datagas;

      console.log("new", newstate);
      setState({ ...newstate });
    }
  })

  //========================

  //take the filter option and convert to hour
  const covertToHour = (option) => {
    switch (option) {
      case "th1":
        return 1
      case "th2":
        return 2
      case "th6":
        return 6
      case "th12":
        return 12
      case "td1":
        return 24
      case "tw1":
        return 168
      case "tm1":
        return 720
    }
    return 1
  }


  {/* Change Handler for Temperature Filter */ }
  const changLangHandlerT = async () => {
    let filter = document.getElementById("tfilter").value;
    let hours = covertToHour(filter)
    console.log(filter)
    //call API with feed temperature and the converted hour
    //update the diagram after receiving the respond
    let res = await axios.get(`http://localhost:3030/get-chart-by-feed/bbc-temp/${hours}`)
    console.log(res.data)
    setState({ ...state, temparrname: res.data.time, temparrvalue: res.data.val, datatemp: drawPoint(res.data.time, res.data.val) })
    console.log(state)
  }

  {/* Change Handler for Humidity Filter */ }
  const changLangHandlerH = async () => {
    let filter = document.getElementById("hfilter").value;
    let hours = covertToHour(filter)
    //call API with feed temperature and the converted hour
    //update the diagram after receiving the respond
    let res = await axios.get(`http://localhost:3030/get-chart-by-feed/bbc-humi/${hours}`)
    console.log(res.data)
    setState({ ...state, humarrname: res.data.time, humarrvalue: res.data.val, datahumid: drawPoint(res.data.time, res.data.val) })
    console.log(state)

  }

  {/* Change Handler for Gas Filter */ }
  const changLangHandlerG = async () => {
    let filter = document.getElementById("gfilter").value;
    let hours = covertToHour(filter)
    //call API with feed temperature and the converted hour
    //update the diagram after receiving the respond
    let res = await axios.get(`http://localhost:3030/get-chart-by-feed/bbc-gas/${hours}`)
    console.log(res.data)
    setState({ ...state, gasarrname: res.data.time, gasarrvalue: res.data.val, datahumid: drawPoint(res.data.time, res.data.val) })
  }

  return (<div className={Styles.page}>
    <div className={Styles.card}>
      <Card title={Lang.value().temperature}>

        {/* Filter for temperature */}
        <select name="tfilter" id="tfilter" className={styles.option} onChange={changLangHandlerT}>
          <option id="th1" value="th1" className={styles.op2}>{Lang.value().h1}</option>
          <option id="th2" value="th2" className={styles.op2}>{Lang.value().h2}</option>
          <option id="th6" value="th6" className={styles.op2}>{Lang.value().h6}</option>
          <option id="th12" value="th12" className={styles.op2}>{Lang.value().h12}</option>
          <option id="td1" value="td1" className={styles.op2}>{Lang.value().d1}</option>
          <option id="tw1" value="tw1" className={styles.op2}>{Lang.value().w1}</option>
          <option id="tm1" value="tm1" className={styles.op2}>{Lang.value().m1}</option>
        </select>

        <StatisticContent data={state.datatemp} max={() => getmaxx(state.temparrvalue) + " °C"} min={() => getminn(state.temparrvalue) + " °C"} avg={() => getavg(state.temparrvalue) + " °C"}></StatisticContent>
      </Card>
      <Card title={Lang.value().humidity}>

        {/* Filter for humidity */}
        <select name="hfilter" id="hfilter" className={styles.option} onChange={changLangHandlerH}>
          <option id="th1" value="th1" className={styles.op2}>{Lang.value().h1}</option>
          <option id="th2" value="th2" className={styles.op2}>{Lang.value().h2}</option>
          <option id="th6" value="th6" className={styles.op2}>{Lang.value().h6}</option>
          <option id="th12" value="th12" className={styles.op2}>{Lang.value().h12}</option>
          <option id="td1" value="td1" className={styles.op2}>{Lang.value().d1}</option>
          <option id="tw1" value="tw1" className={styles.op2}>{Lang.value().w1}</option>
          <option id="tm1" value="tm1" className={styles.op2}>{Lang.value().m1}</option>
        </select>

        <StatisticContent data={state.datahumid} max={() => getmaxx(state.humarrvalue) + " %"} min={() => getminn(state.humarrvalue) + " %"} avg={() => getavg(state.humarrvalue) + " %"}></StatisticContent>
      </Card>
      <Card title={Lang.value().gas}>
        {/* Filter for gas */}
        <select name="gfilter" id="gfilter" className={styles.option} onChange={changLangHandlerG}>
          <option id="th1" value="th1" className={styles.op2}>{Lang.value().h1}</option>
          <option id="th2" value="th2" className={styles.op2}>{Lang.value().h2}</option>
          <option id="th6" value="th6" className={styles.op2}>{Lang.value().h6}</option>
          <option id="th12" value="th12" className={styles.op2}>{Lang.value().h12}</option>
          <option id="td1" value="td1" className={styles.op2}>{Lang.value().d1}</option>
          <option id="tw1" value="tw1" className={styles.op2}>{Lang.value().w1}</option>
          <option id="tm1" value="tm1" className={styles.op2}>{Lang.value().m1}</option>
        </select>

        <StatisticContent data={state.datagas} max={() => getmaxx(state.gasarrvalue) + " ppm"} min={() => getminn(state.gasarrvalue) + " ppm"} avg={() => getavg(state.gasarrvalue) + " ppm"}></StatisticContent>
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
  const res = await axios.get(`${ServerUrl}get-all-chart-data/1`, {
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



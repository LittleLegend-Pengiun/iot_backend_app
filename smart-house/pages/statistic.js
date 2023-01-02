import Card from "../components/Card"
import Layout from "../layout/layout"
import styles from "../styles/light/Statistic.module.css"
import styles2 from "../styles/dark/Statistic.module.css"
import StatisticContent from "../components/StatisticContent"
import { useDispatch, useSelector } from "react-redux";
import { changeToVi, changeToEng } from "../feature/languageSlice";
import { changeToLi, changeToDar } from "../feature/darkmodeSlice";
import { useEffect } from "react";
// const dataHouseState = [{ key: "temp", name: "Nhiệt độ", val: "35 °C" }, { key: "humid", name: "Độ ẩm", val: "76 %" }]

// Used to store darkmode state
var darkst = 0;

export default function Statistic() {

  {/* Change Dark Mode and Language Block ===================================================================== */ }
  {/* ========================================================================================================= */ }
  const Lang = useSelector(state => state.language);
  const DM = useSelector(state => state.darkmode);
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();

  useEffect(() => {
    document.title = 'NHH Smarthome';
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


  return (<div className={darkst == 0 ? styles.page : styles2.page}>
    <div className={darkst == 0 ? styles.card : styles2.card}>
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

// Get max temp function
function getmaxx(dataarray) {
  var a = Math.max.apply(Math, dataarray);
  return a;
}
// Get min temp function
function getminn(dataarray) {
  var a = Math.min.apply(Math, dataarray);
  return a;
}
// Get avg temp function
function getavg(dataarray) {
  var a = dataarray.reduce((a, b) => a + b, 0) / dataarray.length;
  a = a.toFixed(1);
  return a;
}
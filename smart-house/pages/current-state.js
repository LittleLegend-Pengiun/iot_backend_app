import Card from "../components/Card"
import Layout from "../layout/layout"
import styles from "../styles/light/Current-state.module.css"
import styles2 from "../styles/dark/Current-state.module.css"
import CurrentStateContent from "../components/CurrentStateContent"
import { useDispatch, useSelector } from "react-redux";
import { changeToVi, changeToEng } from "../feature/languageSlice";
import { changeToLi, changeToDar } from "../feature/darkmodeSlice";
import { useEffect } from "react";

// Used to store darkmode state
var darkst = 0;

const dataHouseState = [{ key: "temp", name: "Nhiệt độ", val: "35 °C" }, { key: "humid", name: "Độ ẩm", val: "76 %" }]

const dataDeviceState = [{ key: "lamp", name: "Đèn", val: "TẮT" }, { key: "fan", name: "Quạt", val: "MỞ" }, { key: "curtain", name: "Rèm", val: "ĐÓNG" }]

export default function CurrentState() {

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
      <Card title={Lang.value().house_state}>
        <CurrentStateContent list_state={dataHouseState}></CurrentStateContent>
      </Card>
    </div>
    <div className={darkst == 0 ? styles.card : styles2.card}>
      <Card title={Lang.value().device_state}>
        <CurrentStateContent list_state={dataDeviceState}></CurrentStateContent>
      </Card>
    </div>
  </div >)
}


CurrentState.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
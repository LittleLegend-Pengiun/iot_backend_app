import styles from "../styles/light/CurrentStateContent.module.css";
import styles2 from "../styles/dark/CurrentStateContent.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureLow, faDroplet, faLightbulb, faMattressPillow, faFan } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { changeToVi, changeToEng } from "../feature/languageSlice";
import { changeToLi, changeToDar } from "../feature/darkmodeSlice";
import { useEffect } from "react";

// Used to store darkmode state
var darkst = 0;

export default function CurrentStateContent({ list_state }) {

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


  //const Icon = [faTemperatureLow, faDroplet]
  //let indexIcon = 0;


  const getIcon = (key) => {
    switch (key) {
      case "temp":
        return faTemperatureLow;
      case "humid":
        return faDroplet;
      case "lamp":
        return faLightbulb;
      case "fan":
        return faFan;
      case "curtain":
        return faMattressPillow;
    }
    return;
  }

  const getStateName = (key) => {
    switch (key) {
      case "temp":
        return Lang.value().temperature;
      case "humid":
        return Lang.value().humidity;
      case "lamp":
        return Lang.value().lamp;
      case "fan":
        return Lang.value().fan;
      case "curtain":
        return Lang.value().curtain;
    }
    return;
  }

  const getStateVal = (value) => {
    switch (value) {
      case "MỞ":
        return Lang.value().on;
      case "TẮT":
        return Lang.value().off;
      case "ĐÓNG":
        return Lang.value().closed;
    }
    return value;
  }



  return (
    <div className={darkst == 0 ? styles.container : styles2.container}>
      {list_state.map((state) => {
        return <div className={darkst == 0 ? styles.item : styles2.item}>
          <FontAwesomeIcon icon={getIcon(state.key)} style={{ width: "2vw", height: "2vw", marginRight: "3vw" }} />
          <a id={darkst == 0 ? styles.statenametext : styles2.statenametext}> {getStateName(state.key)}: &nbsp; </a>
          <a id={darkst == 0 ? styles.statevaltext : styles2.statevaltext}> {getStateVal(state.val)}</a>
        </div>
      })}
    </div>
  )
}

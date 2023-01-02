import styles from "../styles/light/ControlContent.module.css";
import styles2 from "../styles/dark/ControlContent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeToVi, changeToEng } from "../feature/languageSlice";
import { changeToLi, changeToDar } from "../feature/darkmodeSlice";
import { useEffect } from "react";

// Used to store darkmode state
var darkst = 0;

export default function ControlContent() {

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

        {/* Đèn */}
        <div id={darkst == 0 ? styles.togglebox : styles2.togglebox}>
          <a id={darkst == 0 ? styles.toggleboxlable : styles2.toggleboxlable}>{Lang.value().lamp}</a>
          <input type="checkbox" id="switch1" className={darkst == 0 ? styles.checkbox : styles2.checkbox} onClick={lightsw} />
          <label htmlFor="switch1" className={darkst == 0 ? styles.toggle : styles2.toggle} />
        </div>

        {/* Quạt */}
        <div id={darkst == 0 ? styles.togglebox : styles2.togglebox}>
          <a id={darkst == 0 ? styles.toggleboxlable : styles2.toggleboxlable}>{Lang.value().fan}</a>
          <input type="checkbox" id="switch2" className={darkst == 0 ? styles.checkbox : styles2.checkbox} onClick={fansw} />
          <label htmlFor="switch2" className={darkst == 0 ? styles.toggle : styles2.toggle} />
        </div>

        {/* Rèm */}
        <div id={darkst == 0 ? styles.togglebox : styles2.togglebox}>
          <a id={darkst == 0 ? styles.toggleboxlable : styles2.toggleboxlable}>{Lang.value().curtain} </a>
          <input type="checkbox" id="switch3" className={darkst == 0 ? styles.checkbox : styles2.checkbox} onClick={curtsw} />
          <label htmlFor="switch3" className={darkst == 0 ? styles.toggle : styles2.toggle} />
        </div>

      </div>
    </div>
  )
}


//Function for toggle switch ==============================================

function lightsw() {
  if (document.getElementById('switch1').checked) {
    console.log("on")
  } else {
    console.log("off")
  }
}

function fansw() {
  if (document.getElementById('switch2').checked) {
    console.log("on")
  } else {
    console.log("off")
  }
}

function curtsw() {
  if (document.getElementById('switch3').checked) {
    console.log("on")
  } else {
    console.log("off")
  }
}

//=========================================================================
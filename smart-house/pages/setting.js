import Card from "../components/Card"
import Layout from "../layout/layout"
import { useDispatch, useSelector } from "react-redux";
import { changeToVi, changeToEng } from "../feature/languageSlice";
import { changeToLi, changeToDar } from "../feature/darkmodeSlice";
import { useEffect } from "react";
import styles from "../styles/light/Setting.module.css";
import styles2 from "../styles/dark/Setting.module.css";

// Used to store darkmode state
var darkst = 0;

export default function Setting() {

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

  {/* Called when clicked on Language Select button */ }
  const changLangHandler = e => {
    let lang = document.getElementById("lang");
    localStorage.setItem('language', `${lang.value}`);
    changeLang(lang.value);
  }

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

  {/* Called when clicked on Dark Mode toggle button */ }
  const changDmodeHandler = () => {
    if (darkst == 0) {
      localStorage.setItem('darkstate', 1);
      changeDmode(1);
      window.location.reload();
    } else {
      localStorage.setItem('darkstate', 0);
      changeDmode(0);
      window.location.reload();
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
      <Card title={Lang.value().setting}>

        <div className={darkst == 0 ? styles.container : styles2.container}>
          <div className={darkst == 0 ? styles.item : styles2.item}>

            {/* Dark mode toggle */}
            <div id={darkst == 0 ? styles.togglebox : styles2.togglebox}>
              <a id={darkst == 0 ? styles.toggleboxlable : styles2.toggleboxlable}>{Lang.value().darkm}</a>
              <input type="checkbox" id="switch1" className={darkst == 0 ? styles.checkbox : styles2.checkbox} onClick={changDmodeHandler} />
              <label htmlFor="switch1" className={darkst == 0 ? styles.toggle : styles2.toggle} />
            </div>

            {/* Language */}
            <div id={darkst == 0 ? styles.togglebox : styles2.togglebox}>
              <a id={darkst == 0 ? styles.toggleboxlable : styles2.toggleboxlable}>{Lang.value().language}</a>
              <select name="lang" id="lang" className={darkst == 0 ? styles.option : styles2.option} onChange={changLangHandler} >
                <option id="vi" value="vi" className={darkst == 0 ? styles.op2 : styles2.op2}>{Lang.value().vii}</option>
                <option id="eng" value="eng" className={darkst == 0 ? styles.op2 : styles2.op2}>{Lang.value().enn}</option>
              </select>
            </div>

          </div>
        </div>
      </Card>
    </div>
  </div >)
}


Setting.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
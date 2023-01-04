import Card from "../components/Card"
import Layout from "../layout/layout"
import { useDispatch, useSelector } from "react-redux";
import { changeToVi, changeToEng, changeToFr, changeToGer, changeToSpan } from "../feature/languageSlice";
import { changeToLi, changeToDar } from "../feature/themeSlice";
import { useEffect } from "react";

export default function Setting() {

  const Lang = useSelector(state => state.language);
  const Styles = (useSelector(state => state.theme)).value().setting;
  const dispatch = useDispatch();

  const changLangHandler = e => {
    let lang = document.getElementById("lang");
    localStorage.setItem('language', `${lang.value}`);
    changeLang(lang.value);
  }
  const changeLang = (lang) => {
    switch (lang) {
      case "vi":
        dispatch(changeToVi())
        break
      case "eng":
        dispatch(changeToEng())
        break
      case "fr":
        dispatch(changeToFr())
        break
      case "ger":
        dispatch(changeToGer())
        break
      case "span":
        dispatch(changeToSpan())
        break
    }
  }

  const changeThemeHandler = () => {
    console.log("change theme")
    let theme = document.getElementById("switch1");
    changeDmode(theme.checked);
  }
  const changeDmode = (isDark) => {
    if (isDark) dispatch(changeToDar())
    else dispatch(changeToLi())
  }

  useEffect(() => {
    const iniLanguage = localStorage.getItem('language');
    changeLang(iniLanguage);
    const selectedOption = document.getElementById(iniLanguage);
    if (selectedOption != null) { selectedOption.setAttribute("selected", "") };
  }, [])

  return (<div className={Styles.page}>
    <div className={Styles.card}>
      <Card title={Lang.value().setting}>

        <div className={Styles.container}>
          <div className={Styles.item}>

            {/* Dark mode toggle */}
            <div id={Styles.togglebox}>
              <a id={Styles.toggleboxlable}>{Lang.value().darkm}</a>
              <input type="checkbox" id="switch1" className={Styles.checkbox} onChange={changeThemeHandler} />
              <label htmlFor="switch1" className={Styles.toggle} />
            </div>

            {/* Language */}
            <div id={Styles.togglebox}>
              <a id={Styles.toggleboxlable}>{Lang.value().language}</a>
              <select name="lang" id="lang" className={Styles.option} onChange={changLangHandler} >
                <option id="vi" value="vi" className={Styles.op2}>{Lang.value().vi}</option>
                <option id="eng" value="eng" className={Styles.op2}>{Lang.value().en}</option>
                <option id="fr" value="fr" className={Styles.op2}>{Lang.value().fr}</option>
                <option id="ger" value="ger" className={Styles.op2}>{Lang.value().ger}</option>
                <option id="span" value="span" className={Styles.op2}>{Lang.value().span}</option>
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
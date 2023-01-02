import Card from "../components/Card"
import Layout from "../layout/layout"
import { useDispatch, useSelector } from "react-redux";
import { changeToVi, changeToEng } from "../feature/languageSlice";
import { changeToLi, changeToDar } from "../feature/darkmodeSlice";
import { useEffect } from "react";
import styles from "../styles/light/Admin.module.css";
import styles2 from "../styles/dark/Admin.module.css";

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
      <Card title={<input type="button" value={Lang.value().abutton} id="intbl" onClick={addaccountpanel} className={darkst == 0 ? styles.abutton4 : styles2.abutton4} />}>

        <div className={darkst == 0 ? styles.overlay : styles2.overlay} id="overlay">
          <br></br><br></br><br></br><br></br><br></br><br></br>
          <center>
            <div className={darkst == 0 ? styles.container2 : styles2.container2}>
              {/* Add new user button (will call overlay panel) */}
              <div className={darkst == 0 ? styles.title2 : styles2.title2}>{Lang.value().abutton}</div>
              <div className={darkst == 0 ? styles.content2 : styles2.content2}>
                {/* Input ID (username) for new user */}
                <input type="text" placeholder={"ID"} id="idinput" className={darkst == 0 ? styles.abutton : styles2.abutton} />
                {/* Input password for new user */}
                <input type="text" placeholder={Lang.value().passwd} id="passinput" className={darkst == 0 ? styles.abutton : styles2.abutton} />
                {/* Input fullname for new user */}
                <input type="text" placeholder={Lang.value().fname} id="nameinput" className={darkst == 0 ? styles.abutton : styles2.abutton} />
                <br></br><br></br>
              </div>
              <br></br><br></br>
              {/* Confirm to add user button (Do stuff here) */}
              <input type="button" value={Lang.value().cre} id="sendbutton" onClick={addaccount} className={darkst == 0 ? styles.abutton2 : styles2.abutton2} />
              {/* Cancel button (go back, hide overlay panel) */}
              <input type="button" value={Lang.value().back} id="backbutton" onClick={addaccountpanelc} className={darkst == 0 ? styles.abutton3 : styles2.abutton3} />
              <br></br><br></br>
            </div>
          </center>
        </div>

        {/* The User Table Block ==================================================================================== */}
        {/* ========================================================================================================= */}
        <div className={darkst == 0 ? styles.container : styles2.container}>
          <div className={darkst == 0 ? styles.item : styles2.item}>
            <table className={darkst == 0 ? styles.styledtable : styles2.styledtable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{Lang.value().fname}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>nghivi</td>
                  <td>Hà Vĩnh Nghi</td>
                </tr>
                <tr>
                  <td>nghivi</td>
                  <td>Hà Vĩnh Nghi</td>
                </tr>
                <tr>
                  <td>nghivi</td>
                  <td>Hà Vĩnh Nghi</td>
                </tr>
                <tr>
                  <td>nghivi</td>
                  <td>Hà Vĩnh Nghi</td>
                </tr>
                <tr>
                  <td>nghivi</td>
                  <td>Hà Vĩnh Nghi</td>
                </tr>
                <tr>
                  <td>nghivi</td>
                  <td>Hà Vĩnh Nghi</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* The User Table Block ==================================================================================== */}
        {/* ========================================================================================================= */}

      </Card>
    </div>
  </div >)
}


{/* ADD NEW USER Block ====================================================================================== */ }
{/* ========================================================================================================= */ }
// Open Add Account Panel
function addaccountpanel() {
  document.getElementById("overlay").style.width = "100%";
}
// Close Add Account Panel
function addaccountpanelc() {
  document.getElementById("overlay").style.width = "0%";
}
// Add Account Button Clicked (DO STUFF HERE) ================================================================
// ===========================================================================================================
function addaccount() {
  var ID = document.getElementById("idinput").value; //username from box
  var pass = document.getElementById("passinput").value; //password from box
  var name = document.getElementById("nameinput").value; //fullname from box
  console.log(ID + ", " + pass + ", " + name);
}
{/* ADD NEW USER Block ====================================================================================== */ }
{/* ========================================================================================================= */ }


Setting.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
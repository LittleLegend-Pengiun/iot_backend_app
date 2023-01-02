import styles from "../styles/light/Drawer.module.css";
import styles2 from "../styles/dark/Drawer.module.css";
import Link from "next/link";
import Image from "next/image";
import avatarImg from "./nhh.jpg";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faToggleOn, faChartPie, faCog, faShield } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { changeToVi, changeToEng } from "../feature/languageSlice";
import { changeToLi, changeToDar } from "../feature/darkmodeSlice";
import { useEffect } from "react";

// Used to store darkmode state
var darkst = 0;
// Used to store current route for reload
var routecheck, currroute;

export default function Drawer() {

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

  {/* After change darkmode/language or change tab, the page will refresh. Side panel will maximize out to 
      cover the changing process. This function used to Minimize back side panel after reload */ }
  useEffect(() => {
    moveovl();
  });
  {/* Change Dark Mode and Language Block ===================================================================== */ }
  {/* ========================================================================================================= */ }


  const router = useRouter();
  const currentRoute = router.pathname;
  currroute = currentRoute;

  return (
    <nav>
      <div className={darkst == 0 ? styles.drawer : styles2.drawer} id="ovl">
        <div className={darkst == 0 ? styles.userinfo : styles2.userinfo}>
          <p id={darkst == 0 ? styles.vwbox : styles2.vwbox}></p>
          <p id={darkst == 0 ? styles.imgStyle : styles2.imgStyle}><Image src={avatarImg} id={darkst == 0 ? styles.imgStyle : styles2.imgStyle}></Image></p>
          <p id={darkst == 0 ? styles.namebox : styles2.namebox}>THÙY DUNG</p>
        </div>
        <br></br>
        <Link href="/current-state">
          <li id={currentRoute == "/current-state" ? "active" : ""} onClick={refreshPage}>
            &nbsp;&nbsp;<FontAwesomeIcon icon={faHome} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {Lang.value().overview}
          </li>
        </Link>
        <Link href="/control">
          <li id={currentRoute == "/control" ? "active" : ""} onClick={refreshPage}>
            &nbsp;&nbsp;<FontAwesomeIcon icon={faToggleOn} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {Lang.value().control}
          </li>
        </Link>
        <Link href="/statistic">
          <li id={currentRoute == "/statistic" ? "active" : ""} onClick={refreshPage}>
            &nbsp;&nbsp;<FontAwesomeIcon icon={faChartPie} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {Lang.value().statistic}
          </li>
        </Link>
        <Link href="/setting">
          <li id={currentRoute == "/setting" ? "active" : ""} onClick={refreshPage}>
            &nbsp;&nbsp;<FontAwesomeIcon icon={faCog} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {Lang.value().setting}
          </li>
        </Link>
        <Link href="/admin">
          <li id={currentRoute == "/admin" ? "active" : ""} onClick={refreshPage}>
            &nbsp;&nbsp;<FontAwesomeIcon icon={faShield} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {Lang.value().admin}
          </li>
        </Link>
      </div>
      <style jsx>{`
        #active {
          cursor: pointer;
          background-color: #525252;
          color: white;
          border-radius: 1vw;
          width: 80%;
          text-align: left;
        }
      `}</style>
    </nav>
  );
}

{/* Change Dark Mode and Language Block ===================================================================== */ }
{/* ========================================================================================================= */ }
{/* After change darkmode/language or change tab, the page will refresh. Side panel will maximize out to 
    cover the changing process. This function used to Minimize back side panel after reload*/ }

// This function make other function wait for specific element to load up ===================================
function waitForElm(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }
    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}
// This function used to refresh page after clicked on another tab in the DRAWER (in order for "non-default" 
// darkmode and language state to take effect) ==============================================================
async function refreshPage() {
  // Get current route before switch TAB
  routecheck = currroute;
  // Maximize the side panel to cover messy stuff when reload
  document.getElementById("ovl").style.width = "100vw";
  // Wait until switched to new TAB (current route != saved route)
  while (currroute == routecheck) { await sleep(100) };
  // Reload
  window.location.reload();
}
// This function used to Minimize back side panel after reload ==============================================
async function moveovl() {
  // The side panel will not set to "flex" by default as we will see some strange effect
  document.getElementById("ovl").style.display = "flex";
  // Wait for page to load completed then minimize side panel
  const elm = await waitForElm('#ovl');
  await sleep(100);
  document.getElementById("ovl").style.width = "18vw";
}
// Sleep function to wait ===================================================================================
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
{/* Change Dark Mode and Language Block ===================================================================== */ }
{/* ========================================================================================================= */ }


import Link from "next/link";
import Image from "next/image";
import avatarImg from "./nhh.jpg";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faToggleOn, faChartPie, faCog, faShield } from '@fortawesome/free-solid-svg-icons'
import {useSelector } from "react-redux";

export default function Drawer() {

  const Lang = useSelector(state => state.language);
  const Styles = (useSelector(state => state.theme)).value().drawer;
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <nav>
      <div className={Styles.drawer}>
        <div className={Styles.drawerSection}>
          <p id={Styles.vwbox}></p>
          <p id={Styles.imgStyle}><Image src={avatarImg} id={Styles.imgStyle}></Image></p>
          <p id={Styles.namebox}>THÙY DUNG</p>
        </div>
        <p id={Styles.vwbox}></p>
        <div className={Styles.drawerSection}>
        <Link href="/current-state">
          <li id={currentRoute == "/current-state" ? "active" : ""}>
            &nbsp;&nbsp;<FontAwesomeIcon icon={faHome} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {Lang.value().overview}
          </li>
        </Link>
        <Link href="/control">
          <li id={currentRoute == "/control" ? "active" : ""}>
            &nbsp;&nbsp;<FontAwesomeIcon icon={faToggleOn} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {Lang.value().control}
          </li>
        </Link>
        <Link href="/statistic">
          <li id={currentRoute == "/statistic" ? "active" : ""}>
            &nbsp;&nbsp;<FontAwesomeIcon icon={faChartPie} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {Lang.value().statistic}
          </li>
        </Link>
        <Link href="/setting">
          <li id={currentRoute == "/setting" ? "active" : ""}>
            &nbsp;&nbsp;<FontAwesomeIcon icon={faCog} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {Lang.value().setting}
          </li>
        </Link>
        <Link href="/admin">
          <li id={currentRoute == "/admin" ? "active" : ""}>
            &nbsp;&nbsp;<FontAwesomeIcon icon={faShield} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {Lang.value().admin}
          </li>
        </Link>
        </div>
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
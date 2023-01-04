import styles from "../styles/Drawer.module.css";
import Link from "next/link";
import Image from "next/image";
import avatarImg from "./nhh.jpg";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faToggleOn, faChartPie, faCog } from '@fortawesome/free-solid-svg-icons'


export default function Drawer() {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <nav>
      <div className={styles.drawer}>
        <div className={styles.userinfo}>
          <p id={styles.vwbox}></p>
          <p id={styles.imgStyle}><Image src={avatarImg} id={styles.imgStyle}></Image></p>
          <p id={styles.namebox}>THÙY DUNG</p>
        </div>
        <p id={styles.vwbox}></p>
        <Link href="/current-state">
          <li id={currentRoute == "/current-state" ? "active" : ""}>
            &nbsp;&nbsp;<FontAwesomeIcon icon={faHome} size="s" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Tổng quan
          </li>
        </Link>
        <Link href="/control">
          <li id={currentRoute == "/control" ? "active" : ""}>
            &nbsp;&nbsp;<FontAwesomeIcon icon={faToggleOn} size="s" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Điều khiển
          </li>
        </Link>
        <Link href="/statistic">
          <li id={currentRoute == "/statistic" ? "active" : ""}>
            &nbsp;&nbsp;<FontAwesomeIcon icon={faChartPie} size="s" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Thống kê
          </li>
        </Link>
        <Link href="/setting">
          <li id={currentRoute == "/setting" ? "active" : ""}>
            &nbsp;&nbsp;<FontAwesomeIcon icon={faCog} size="s" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Cài đặt
          </li>
        </Link>
      </div>
      <style jsx>{`
        #active {
          cursor: pointer;
          background-color: #7E7E7E;
          color: white;
          border-radius: 1vw;
          width: 80%;
          text-align: left;
        }
      `}</style>
    </nav>
  );
}

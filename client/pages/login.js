import Image from "next/image"
import coverImg from "../assets/MordernHouse.jpg"
import LoginForm from "../components/LoginForm"
import styles from "../styles/Login.module.css"
export default function Login() {
  return (<div className={styles.container}>
    <div className={styles.cover}>
      <div className={styles.coverStyle}>
        <div className={styles.coverContentContainer}>
          <p>BK SMART HOUSE</p>
        </div>
      </div>


    </div>
    <div style={{ width: "40%", padding: "5%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{fontWeight:"bold", fontSize:"30px"}}>WELCOME HOME!</div>
      <LoginForm />
    </div>
  </div>)
}
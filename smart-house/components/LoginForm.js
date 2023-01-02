import Card from "./Card"
import styles from "../styles/light/Login.module.css"
import styles2 from "../styles/dark/Login.module.css"
export default function LoginForm() {

  const Redirect = () => {
    //will do some authentication work here before navigate user to the main page
    window.location.href = 'http://localhost:3000/current-state';
  }

  return (
    <Card title="Login">
      <div >
        <div className={styles.formContentContainer}>
          <div style={{ marginBottom: "40px" }}>
            <div className={styles.inputInfo}>
              <label>Username</label>
              <input type="text" className={styles.inputBox}></input>
              <label>Password</label>
              <input type="text" className={styles.inputBox}></input>
            </div>

            <div>
              <input type="checkbox"></input>
              <label>Remember me</label>
            </div>
          </div>
          <button type="submit" className={styles.submitBtn} onClick={Redirect}>Login</button>
          <div style={{ marginTop: "auto" }}>Can't signin? Contact admin, please!</div>
        </div>
      </div>
    </Card>
  )
}


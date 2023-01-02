import Card from "./Card"
import styles from "../styles/light/Login.module.css"
import axios from "axios";
import { useState } from "react";
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router'
import { ServerUrl } from "./variable";
export default function LoginForm() {

  const router = useRouter();

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const Redirect = async () => {
    //will do some authentication work here before navigate user to the main page
    try {
      //console.log(`${ServerUrl}users/authenticate`);
      const res = await axios.post(`http://localhost:3030/users/authenticate`, {
        "username": usernameInput,
        "password": passwordInput
      }, {
        withCredentials: true
      })
      const {data} = res;
      console.log(res.error);
      setCookie("jwt-token", data["jwt-token"]);
      router.push("/control");
    } catch(e) {
      // const {response} = e;
      // if(response.status) {
      //   alert("Login failed, invalid credential");
      // }
      console.log("Login error", e);
    }
    // window.location.href = 'http://localhost:3000/current-state';
  }

  return (
    <Card title="Login">
      <div >
        <div className={styles.formContentContainer}>
          <div style={{ marginBottom: "40px" }}>
            <div className={styles.inputInfo}>
              <label>Username</label>
              <input type="text" className={styles.inputBox} onChange={(event) => setUsernameInput(event.target.value)} ></input>
              <label>Password</label>
              <input type="text" className={styles.inputBox} onChange={(event) => setPasswordInput(event.target.value)} ></input>
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


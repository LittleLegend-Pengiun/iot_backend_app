import styles from "../styles/ControlContent.module.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureLow, faDroplet, faLightbulb, faPersonBooth, faFan } from "@fortawesome/free-solid-svg-icons";

export default function ControlContent({controlState}) {
  return (
    <div className={styles.container}>
      <div className={styles.item}>

        {/* Đèn */}
        <div id={styles.togglebox}>
          <a id={styles.toggleboxlable}>Đèn</a>
          <input value={controlState["led"] === "1"} type="checkbox" id="switch1" className={styles.checkbox} onClick={lightsw} />
          <label htmlFor="switch1" className={styles.toggle} />
        </div>

        {/* Quạt */}
        <div id={styles.togglebox}>
          <a id={styles.toggleboxlable}>Quạt</a>
          <input value={controlState["pump"] === "3"} type="checkbox" id="switch2" className={styles.checkbox} onClick={pumpsw} />
          <label htmlFor="switch2" className={styles.toggle} />
        </div>

        {/* Rèm */}
        <div id={styles.togglebox}>
          <a id={styles.toggleboxlable}>Rèm </a>
          <input type="checkbox" id="switch3" className={styles.checkbox} onClick={curtsw} />
          <label htmlFor="switch3" className={styles.toggle} />
        </div>

      </div>
    </div>
  )
}


//Function for toggle switch ==============================================

async function lightsw() {
  if (document.getElementById('switch1').checked) {
    const res = await axios.post(`${process.env.API_HOST}:${process.env.HTTP_PORT}/server/update-device-status`, {
      "device": "led",
      "deviceStatus": "1"
    });
    console.log("LED switch response", res);
  } else {
    const res = await axios.post(`${process.env.API_HOST}:${process.env.HTTP_PORT}/server/update-device-status`, {
      "device": "led",
      "deviceStatus": "0"
    });
    console.log("LED switch response", res);
  }
}

async function pumpsw() {
  if (document.getElementById('switch2').checked) {
    const res = await axios.post(`${process.env.API_HOST}:${process.env.HTTP_PORT}/server/update-device-status`, {
      "device": "pump",
      "deviceStatus": "3"
    });
    console.log("Pump switch response", res);
  } else {
    const res = await axios.post(`${process.env.API_HOST}:${process.env.HTTP_PORT}/server/update-device-status`, {
      "device": "pump",
      "deviceStatus": "4"
    });
    console.log("Pump switch response", res);
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
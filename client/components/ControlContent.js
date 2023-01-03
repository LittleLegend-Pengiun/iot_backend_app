import styles from "../styles/ControlContent.module.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureLow, faDroplet, faLightbulb, faPersonBooth, faFan } from "@fortawesome/free-solid-svg-icons";
import { ServerUrl } from "./variable";

export default function ControlContent({ controlState }) {

  //console.log("controlState", controlState);
  //console.log("led", controlState["led"][0].value === "1");
  //console.log("pump", controlState["pump"][0].value === "3");
  return (
    <div className={styles.container}>
      <div className={styles.item}>

        {/* Đèn */}
        <div id={styles.togglebox}>
          <a id={styles.toggleboxlable}>Đèn</a>
          <input checked={controlState["led"][0].value === "1"} type="checkbox" id="switch1" className={styles.checkbox} onClick={lightsw} />
          <label htmlFor="switch1" className={styles.toggle} />
        </div>

        {/* Quạt */}
        <div id={styles.togglebox}>
          <a id={styles.toggleboxlable}>Bơm</a>
          <input checked={controlState["pump"][0].value === "3"} type="checkbox" id="switch2" className={styles.checkbox} onClick={pumpsw} />
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

async function lightsw(cookie) {
  console.log('call');
  if (document.getElementById('switch1').checked) {
    const res = await axios.post(`${ServerUrl}update-device-status`, {
      "device": "led",
      "deviceStatus": "1"
    }, {
      withCredentials: true,
    });
    console.log("LED switch response", res);
  } else {
    const res = await axios.post(`${ServerUrl}update-device-status`, {
      "device": "led",
      "deviceStatus": "0"
    }, {
      withCredentials: true,
    });
    console.log("LED switch response", res);
  }
}

async function pumpsw(cookie) {
  if (document.getElementById('switch2').checked) {
    const res = await axios.post(`${ServerUrl}update-device-status`, {
      "device": "pump",
      "deviceStatus": "3"
    }, {
      withCredentials: true,
    });
    console.log("Pump switch response", res);
  } else {
    const res = await axios.post(`${ServerUrl}update-device-status`, {
      "device": "pump",
      "deviceStatus": "4"
    }, {
      withCredentials: true,
    });
    console.log("Pump switch response", res);
  }
}

function curtsw(cookie) {
  if (document.getElementById('switch3').checked) {
    console.log("on")
  } else {
    console.log("off")
  }
}

//=========================================================================
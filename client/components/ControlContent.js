import styles from "../styles/ControlContent.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureLow, faDroplet, faLightbulb, faPersonBooth, faFan } from "@fortawesome/free-solid-svg-icons";

export default function ControlContent() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>

        {/* Đèn */}
        <div id={styles.togglebox}>
          <a id={styles.toggleboxlable}>Đèn</a>
          <input type="checkbox" id="switch1" className={styles.checkbox} onClick={lightsw} />
          <label htmlFor="switch1" className={styles.toggle} />
        </div>

        {/* Quạt */}
        <div id={styles.togglebox}>
          <a id={styles.toggleboxlable}>Quạt</a>
          <input type="checkbox" id="switch2" className={styles.checkbox} onClick={fansw} />
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

function lightsw() {
  if (document.getElementById('switch1').checked) {
    console.log("on")
  } else {
    console.log("off")
  }
}

function fansw() {
  if (document.getElementById('switch2').checked) {
    console.log("on")
  } else {
    console.log("off")
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
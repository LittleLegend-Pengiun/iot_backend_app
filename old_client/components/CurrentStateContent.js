import styles from "../styles/CurrentStateContent.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureLow, faDroplet, faLightbulb, faMattressPillow, faFan } from "@fortawesome/free-solid-svg-icons";


const getIcon = (key) => {
  switch (key) {
    case "temp":
      return faTemperatureLow;
    case "humid":
      return faDroplet;
    case "lamp":
      return faLightbulb;
    case "fan":
      return faFan;
    case "curtain":
      return faMattressPillow;
  }
  return;
}


export default function CurrentStateContent({ list_state }) {

  //const Icon = [faTemperatureLow, faDroplet]
  //let indexIcon = 0;

  return (
    <div className={styles.container}>
      {list_state.map((state) => {
        return <div className={styles.item}> 
              <FontAwesomeIcon icon={getIcon(state.key)} style={{ width: "2vw", height: "2vw", marginRight: "3vw" }}/> 
              <a id={styles.statenametext}> {state.name}: &nbsp; </a>
              <a id={styles.statevaltext}> {state.val}</a>
          </div>
      })}
    </div>
  )
}

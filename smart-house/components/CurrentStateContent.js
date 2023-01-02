import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureLow, faDroplet, faLightbulb, faMattressPillow, faFan } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function CurrentStateContent({ list_state }) {

  const Lang = useSelector(state => state.language);
  const Styles = (useSelector(state => state.theme)).value().currentStateContent;

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

  const getStateName = (key) => {
    switch (key) {
      case "temp":
        return Lang.value().temperature;
      case "humid":
        return Lang.value().humidity;
      case "lamp":
        return Lang.value().lamp;
      case "fan":
        return Lang.value().fan;
      case "curtain":
        return Lang.value().curtain;
    }
    return;
  }

  const getStateVal = (value) => {
    switch (value) {
      case "MỞ":
        return Lang.value().on;
      case "TẮT":
        return Lang.value().off;
      case "ĐÓNG":
        return Lang.value().closed;
    }
    return value;
  }

  return (
    <div className={Styles.container}>
      {list_state.map((state) => {
        return <div className={Styles.item} key={state.id}>
          <FontAwesomeIcon icon={getIcon(state.key)} style={{ width: "2vw", height: "2vw", marginRight: "3vw" }} />
          <a id={Styles.statenametext}> {getStateName(state.key)}: &nbsp; </a>
          <a id={Styles.statevaltext}> {getStateVal(state.val)}</a>
        </div>
      })}
    </div>
  )
}

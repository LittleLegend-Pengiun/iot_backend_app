import { useSelector } from "react-redux";
import { ServerUrl } from "./variable";
import axios from "axios";

export default function ControlContent({ controlState, cookie }) {

  const Lang = useSelector(state => state.language);
  const Styles = (useSelector(state => state.theme)).value().controlContent;

  //console.log("controlState", controlState["curtain"]);
  return (
    <div className={Styles.container}>
      <div className={Styles.item}>

        {/* Đèn */}
        <div id={Styles.togglebox}>
          <a id={Styles.toggleboxlable}>{Lang.value().lamp}</a>
          <input defaultChecked={controlState["led"][0].value == "1"} type="checkbox" id="switch1" className={Styles.checkbox} onChange={async () => await lightsw(cookie)} />
          <label htmlFor="switch1" className={Styles.toggle} />
        </div>

        {/* Quạt */}
        <div id={Styles.togglebox}>
          <a id={Styles.toggleboxlable}>{Lang.value().fan}</a>
          <input defaultChecked={controlState["fan"][0].value == "3"} type="checkbox" id="switch2" className={Styles.checkbox} onChange={async () => await fansw(cookie)} />
          <label htmlFor="switch2" className={Styles.toggle} />
        </div>

        {/* Rèm */}
        <div id={Styles.togglebox}>
          <a id={Styles.toggleboxlable}>{Lang.value().curtain} </a>
          <input defaultChecked={controlState["curtain"][0].value == "7"} type="checkbox" id="switch3" className={Styles.checkbox} onChange={async () => await curtsw(cookie)} />
          <label htmlFor="switch3" className={Styles.toggle} />
        </div>

        {/* Còi cháy nổ */}
        <div id={Styles.togglebox}>
          <a id={Styles.toggleboxlable}>{Lang.value().buzzer} </a>
          <input defaultChecked={controlState["buzzer"][0].value == "5"} type="checkbox" id="switch4" className={Styles.checkbox} onChange={async () => await buzzersw(cookie)} />
          <label htmlFor="switch4" className={Styles.toggle} />
        </div>

      </div>
    </div>
  )
}

//Function for toggle switch ==============================================

async function lightsw(cookie) {
  try {
    if (document.getElementById('switch1').checked) {
      const res = await axios.post(`${ServerUrl}update-device-status-for-dev`, {
        "device": "led",
        "deviceStatus": "1",
      }, {
        withCredentials: true,
      });
      console.log("LED switch response", res);
    } else {
      const res = await axios.post(`${ServerUrl}update-device-status-for-dev`, {
        "device": "led",
        "deviceStatus": "0",
      }, {
        withCredentials: true,
      });
      console.log("LED switch response", res);
    }
  } catch (e) {
    console.log("error", e)
  }
}

async function fansw(cookie) {
  if (document.getElementById('switch2').checked) {
    const res = await axios.post(`${ServerUrl}update-device-status-for-dev`, {
      "device": "fan",
      "deviceStatus": "3",
    }, {
      withCredentials: true,
    });
    console.log("Pump switch response", res);
  } else {
    const res = await axios.post(`${ServerUrl}update-device-status-for-dev`, {
      "device": "fan",
      "deviceStatus": "2",
    }, {
      withCredentials: true,
    });
    console.log("Pump switch response", res);
  }
}

async function curtsw(cookie) {
  if (document.getElementById('switch3').checked) {
    const res = await axios.post(`${ServerUrl}update-device-status-for-dev`, {
      "device": "curtain",
      "deviceStatus": "7",
    }, {
      withCredentials: true,
    });
  } else {
    const res = await axios.post(`${ServerUrl}update-device-status-for-dev`, {
      "device": "curtain",
      "deviceStatus": "8",
    }, {
      withCredentials: true,
    });
  }
}

async function buzzersw(cookie) {
  if (document.getElementById('switch4').checked) {
    const res = await axios.post(`${ServerUrl}update-device-status-for-dev`, {
      "device": "buzzer",
      "deviceStatus": "5",
    }, {
      withCredentials: true,
    });
  } else {
    const res = await axios.post(`${ServerUrl}update-device-status-for-dev`, {
      "device": "buzzer",
      "deviceStatus": "6",
    }, {
      withCredentials: true,
    });
  }
}

//=========================================================================
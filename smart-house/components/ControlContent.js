import {useSelector } from "react-redux";
export default function ControlContent() {

  const Lang = useSelector(state => state.language);
  const Styles = (useSelector(state => state.theme)).value().controlContent;
 
  return (
    <div className={Styles.container}>
      <div className={Styles.item}>

        {/* Đèn */}
        <div id={Styles.togglebox}>
          <a id={Styles.toggleboxlable}>{Lang.value().lamp}</a>
          <input type="checkbox" id="switch1" className={Styles.checkbox} onClick={lightsw} />
          <label htmlFor="switch1" className={Styles.toggle} />
        </div>

        {/* Quạt */}
        <div id={Styles.togglebox}>
          <a id={Styles.toggleboxlable}>{Lang.value().fan}</a>
          <input type="checkbox" id="switch2" className={Styles.checkbox} onClick={fansw} />
          <label htmlFor="switch2" className={Styles.toggle} />
        </div>

        {/* Rèm */}
        <div id={Styles.togglebox}>
          <a id={Styles.toggleboxlable}>{Lang.value().curtain} </a>
          <input type="checkbox" id="switch3" className={Styles.checkbox} onClick={curtsw} />
          <label htmlFor="switch3" className={Styles.toggle} />
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
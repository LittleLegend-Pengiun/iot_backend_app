const initResponsiveDataListener = (state, setState, socket) => {
    const feedKey = {
        temp: "Tez0106/feeds/bbc-temp",
        pump: "Tez0106/feeds/bbc-pump",
        led: "Tez0106/feeds/bbc-led",
        humi: "Tez0106/feeds/bbc-humi"
    };
      //useEffect(() => {
    
    let newstate = {
        led: state.led.slice(0,-1),
        pump: state.pump.slice(0,-1),
        temp: state.temp.slice(0,-1),
        humi: state.humi.slice(0,-1)
    };
    
    socket.on('new_data', (msg) => {          
        let item = msg.data;

        if (msg.feedID == feedKey.temp) newstate["temp"] = [item].concat(state.temp);
        else if (msg.feedID == feedKey.pump) newstate["pump"] = [item].concat(state.pump);
        else if (msg.feedID == feedKey.led) newstate["led"] = [item].concat(state.led);
        else if (msg.feedID == feedKey.humi) newstate["humi"] = [item].concat(state.humi);
        setState(newstate);
    })
}

export default initResponsiveDataListener;
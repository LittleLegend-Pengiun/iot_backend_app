const initResponsiveDataListener = (state, setState, socket) => {
    const feedKey = {
        buzzer: "Tez0106/feeds/bbc-buzzer",
        curtain: "Tez0106/feeds/bbc-curtain",
        fan: "Tez0106/feeds/bbc-fan",
        gas: "Tez0106/feeds/bbc-gas",
        humi: "Tez0106/feeds/bbc-humi",
        led: "Tez0106/feeds/bbc-led",
        temp: "Tez0106/feeds/bbc-temp"
    };
      //useEffect(() => {
    
    let newstate = {
        led: state.led.slice(0,-1),
        curtain: state.curtain.slice(0,-1),
        temp: state.temp.slice(0,-1),
        humi: state.humi.slice(0,-1)
    };
    
    socket.on('new_data', (msg) => {  
        console.log('new_data called',msg);        
        let item = msg.data;

        if (msg.feedID == feedKey.temp) newstate["temp"] = [item].concat(state.temp);
        else if (msg.feedID == feedKey.curtain) newstate["pump"] = [item].concat(state.curtain);
        else if (msg.feedID == feedKey.led) newstate["led"] = [item].concat(state.led);
        else if (msg.feedID == feedKey.humi) newstate["humi"] = [item].concat(state.humi);

        //console.log('new_data state',state);
        //console.log('new_data newState',newstate);    
        setState({...newstate});
    })
}

export default initResponsiveDataListener;
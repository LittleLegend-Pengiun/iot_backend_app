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

    let curstate = null;

    socket.on('new_data', (msg) => {
        // Add buzzer, gas later
        if (msg.feedID == feedKey.temp
            || msg.feedID == feedKey.curtain
            || msg.feedID == feedKey.led
            || msg.feedID == feedKey.humi
            || msg.feedID == feedKey.fan
            || msg.feedID == feedKey.buzzer
            || msg.feedID == feedKey.gas
        ) {
            let newstate = null;
            console.log('new_data called', msg);
            let item = msg.data;

            if (!curstate) {
                newstate = {
                    curtain: [...state.curtain],
                    fan: [...state.fan],
                    led: [...state.led],
                    temp: [...state.temp],
                    humi: [...state.humi],
                    buzzer: [...state.buzzer],
                    gas: [...state.gas],
                };
            } else {
                newstate = {
                    curtain: [...curstate.curtain],
                    fan: [...curstate.fan],
                    led: [...curstate.led],
                    temp: [...curstate.temp],
                    humi: [...curstate.humi],
                    buzzer: [...curstate.buzzer],
                    gas: [...curstate.gas],
                };
            }

            if (msg.feedID == feedKey.temp) newstate["temp"] = [item].concat(state.temp);
            else if (msg.feedID == feedKey.curtain) newstate["curtain"] = [item].concat(state.curtain);
            else if (msg.feedID == feedKey.led) newstate["led"] = [item].concat(state.led);
            else if (msg.feedID == feedKey.humi) newstate["humi"] = [item].concat(state.humi);
            else if (msg.feedID == feedKey.fan) newstate["fan"] = [item].concat(state.fan);
            else if (msg.feedID == feedKey.buzzer) newstate["buzzer"] = [item].concat(state.buzzer);
            else if (msg.feedID == feedKey.gas) newstate["gas"] = [item].concat(state.gas);


            console.log('new_data state', state);
            console.log('new_data newState', newstate);
            curstate = newstate;
            setState({ ...newstate });
        }
    })
}

export default initResponsiveDataListener;
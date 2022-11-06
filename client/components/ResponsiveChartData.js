const initResponsiveChartDataListener = (state, setState, socket) => {
    const feedKey = {
        temp: "Tez0106/feeds/bbc-temp",
        humi: "Tez0106/feeds/bbc-humi"
    };
    
    let newstate = {
        temparrname: state.temparrname.slice(0),
        temparrvalue: state.temparrvalue.slice(0),
        humarrname: state.humarrname.slice(0),
        humarrvalue: state.humarrvalue.slice(0)
    };
    socket.on('new_data', (msg) => {        
        console.log('new_data called');   
        if (msg.feedID == feedKey.temp) 
        {
            newstate["temparrname"] = newstate.temparrname.concat([msg.data.created_at]);
            newstate["temparrvalue"] = newstate.temparrvalue.concat([msg.data.value]);
        }
        else if (msg.feedID == feedKey.humi) 
        {
            newstate["humarrname"] = newstate.humarrname.concat([msg.data.created_at]);
            newstate["humarrvalue"] = newstate.humarrvalue.concat([msg.data.value]);
        }
        setState({...newstate});
    })
}

export default initResponsiveChartDataListener;
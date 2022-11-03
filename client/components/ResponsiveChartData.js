import io from 'Socket.IO-client';


const API = "http://localhost:3030/";

const responsiveChartData = (state, setState) => {
    const feedKey = {
        temp: "Tez0106/feeds/bbc-temp",
        humi: "Tez0106/feeds/bbc-humi"
    };
      //useEffect(() => {
    let socket = io(API, {transports: ['websocket']});
    
    let newstate = {
        temparrname: state.temparrname.slice(0),
        temparrvalue: state.temparrvalue.slice(0),
        humarrname: state.humarrname.slice(0),
        humarrvalue: state.humarrvalue.slice(0)
    };
    
    socket.on('new_data', (msg) => {          
        if (msg.feedID == feedKey.temp) 
        {
            newstate["temparrname"] = state.temparrname.concat([msg.data.created_at]);
            newstate["temparrvalue"] = state.temparrvalue.concat([msg.data.value]);
        }
        else if (msg.feedID == feedKey.humi) 
        {
            newstate["humarrname"] = state.humarrname.concat([msg.data.created_at]);
            newstate["humarrvalue"] = state.humarrvalue.concat([msg.data.value]);
        }
        setState(newstate);
        newstate = {
            temparrname: state.temparrname.slice(0),
            temparrvalue: state.temparrvalue.slice(0),
            humarrname: state.humarrname.slice(0),
            humarrvalue: state.humarrvalue.slice(0)
        };
    })
}

export default responsiveChartData;
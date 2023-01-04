const initResponsiveChartDataListener = (state, setState, socket) => {
    const feedKey = {
        temp: "Tez0106/feeds/bbc-temp",
        humi: "Tez0106/feeds/bbc-humi",
        gas: "Tez0106/feeds/bbc-gas"
    };

    let curstate = null;

    socket.on('new_data', (msg) => {
        if (msg.feedID == feedKey.temp || msg.feedID == feedKey.humi || msg.feedID == feedKey.gas) {
            let newstate = null;
            if (!curstate) {
                newstate = {
                    temparrname: [...state.temparrname],
                    temparrvalue: [...state.temparrvalue],
                    humarrname: [...state.humarrname],
                    humarrvalue: [...state.humarrvalue],
                    gasarrname: [...state.gasarrname],
                    gasarrvalue: [...state.gasarrvalue],
                };
            } else {
                newstate = {
                    temparrname: [...curstate.temparrname],
                    temparrvalue: [...curstate.temparrvalue],
                    humarrname: [...curstate.humarrname],
                    humarrvalue: [...curstate.humarrvalue],
                    gasarrname: [...curstate.gasarrname],
                    gasarrvalue: [...curstate.gasarrvalue],
                };
            }

            console.log('new_chart_data called', msg);
            console.log("old", newstate);
            if (msg.feedID == feedKey.temp) {
                newstate["temparrname"] = newstate.temparrname.concat([msg.data.created_at]);
                newstate["temparrvalue"] = newstate.temparrvalue.concat([msg.data.value]);
            }
            else if (msg.feedID == feedKey.humi) {
                newstate["humarrname"] = newstate.humarrname.concat([msg.data.created_at]);
                newstate["humarrvalue"] = newstate.humarrvalue.concat([msg.data.value]);
            }
            else if (msg.feedID == feedKey.gas) {
                newstate["gasarrname"] = newstate.gasarrname.concat([msg.data.created_at]);
                newstate["gasarrvalue"] = newstate.gasarrvalue.concat([msg.data.value]);
            }

            const datatemp = {
                labels: newstate.temparrname,
                datasets: [
                    {
                        label: '',
                        fill: false,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: '#515bc2',
                        pointBorderColor: 'red',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 5,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'red',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 100,
                        data: newstate.temparrvalue,
                    }
                ]
            };

            const datahumid = {
                labels: newstate.humarrname,
                datasets: [
                    {
                        label: '',
                        fill: false,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: '#515bc2',
                        pointBorderColor: 'red',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 5,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'red',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 100,
                        data: newstate.humarrvalue,
                    }
                ]
            };

            const datagas = {
                labels: newstate.gasarrname,
                datasets: [
                    {
                        label: '',
                        fill: false,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: '#515bc2',
                        pointBorderColor: 'red',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 5,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'red',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 100,
                        data: newstate.gasarrvalue,
                    }
                ]
            };

            newstate["datatemp"] = datatemp;
            newstate["datahumid"] = datahumid;
            newstate["datagas"] = datagas;

            console.log("new", newstate);
            curstate = newstate;
            setState({ ...newstate });
        }
    })
}

export default initResponsiveChartDataListener;
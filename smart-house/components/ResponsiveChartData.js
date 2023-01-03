const initResponsiveChartDataListener = (state, setState, socket) => {
    const feedKey = {
        temp: "Tez0106/feeds/bbc-temp",
        humi: "Tez0106/feeds/bbc-humi"
    };

    socket.on('new_data', (msg) => {
        if (msg.feedID == feedKey.temp || msg.feedID == feedKey.humi) {
            let newstate = {
                temparrname: [...state.temparrname],
                temparrvalue: [...state.temparrvalue],
                humarrname: [...state.humarrname],
                humarrvalue: [...state.humarrvalue]
            };

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

            newstate["datatemp"] = datatemp;
            newstate["datahumid"] = datahumid;

            console.log("new", newstate);
            setState({ ...newstate });
        }
    })
}

export default initResponsiveChartDataListener;
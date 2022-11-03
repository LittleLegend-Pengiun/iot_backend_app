import Card from "../components/Card"
import Layout from "../layout/layout"
import styles from "../styles/Current-state.module.css"
import CurrentStateContent from "../components/CurrentStateContent"
import axios from 'axios';
import responsiveData from "../components/ResponsiveData";
import { useState } from "react";

export default function CurrentState({data}) {
  const [state, setState] = useState(data);

  responsiveData(state, setState);
  //socket.off('new_data', listener)
  //}, []);

  let dataHouseState = [{ key: "temp", name: "Nhiệt độ", val: state["temp"][0]["value"] }, { key: "humid", name: "Độ ẩm", val: state["humi"][0]["value"] }]

  let dataDeviceState = [{ key:"lamp", name: "Đèn", val: state["led"][0]["value"] == 0? "TẮT":"BẬT" }, {key:"fan", name: "Bơm", val: state["pump"][0]["value"] == 4? "MỞ":"ĐÓNG" }, { key:"curtain", name: "Rèm", val: "ĐÓNG" }]

  return (<div className={styles.page}>
    <div className={styles.card}>
      <Card title="Trạng thái nhà">
        <CurrentStateContent list_state={dataHouseState}></CurrentStateContent>
      </Card>
    </div>
    <div className={styles.card}>
      <Card title="Trạng thái thiết bị">
        <CurrentStateContent list_state={dataDeviceState}></CurrentStateContent>
      </Card>
    </div>
  </div >)
}


CurrentState.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const res = await axios.get('http://localhost:8080/server/get-all-data');
  const data = res.data;
  return {
      props: { data }
  };
}
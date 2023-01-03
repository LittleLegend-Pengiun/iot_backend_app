import Card from "../components/Card"
import Layout from "../layout/layout"
import CurrentStateContent from "../components/CurrentStateContent"
import { useSelector } from "react-redux";
import axios from "axios";
import { ServerUrl } from "../components/variable";
import { useState, useEffect } from "react";
import { useSocketContext } from "../context/appWrapper";
import initResponsiveDataListener from "../components/ResponsiveData";


export default function CurrentState({ data }) {
  const [state, setState] = useState(data);
  const socket = useSocketContext();

  useEffect(() => {
    initResponsiveDataListener(state, setState, socket);
  }
    , [])

  const Lang = useSelector(state => state.language);
  const Styles = (useSelector(state => state.theme)).value().currentState;

  let dataHouseState = [{ key: "temp", name: "Nhiệt độ", val: state["temp"][0]["value"] }, { key: "humid", name: "Độ ẩm", val: state["humi"][0]["value"] }]

  let dataDeviceState = [{ key: "lamp", name: "Đèn", val: state["led"][0]["value"] == 0 ? "TẮT" : "MỞ" }, { key: "fan", name: "Quạt", val: state["fan"][0]["value"] == 3 ? "ĐÓNG" : "MỞ" }, { key: "curtain", name: "Rèm", val: state["curtain"][0]["value"] == 8 ? "ĐÓNG" : "MỞ" }]

  return (<div className={Styles.page}>
    <div className={Styles.card}>
      <Card title={Lang.value().house_state}>
        <CurrentStateContent list_state={dataHouseState}></CurrentStateContent>
      </Card>
    </div>
    <div className={Styles.card}>
      <Card title={Lang.value().device_state}>
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
  console.log(context.req.headers.cookie);
  const res = await axios.get(`${ServerUrl}get-all-data`, {
    headers: {
      Cookie: context.req.headers.cookie
    }
  });
  // console.log(res.data.isError);
  if (res.data.isError) {
    return {
      redirect: {
        permanent: false,
        destination: "/login"
      }
    }
  }
  return {
    props: { data: res.data }
  };
}
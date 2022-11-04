import Card from "../components/Card"
import Layout from "../layout/layout"
import styles from "../styles/Control.module.css"
import ControlContent from "../components/ControlContent"
import { useSocketContext } from "../context/appWrapper"
import { useState, useEffect } from "react"
import axios from "axios"
import initResponsiveDataListener from "../components/ResponsiveData";
import { useRouter } from "next/router";

// const dataHouseState = [{ key: "temp", name: "Nhiệt độ", val: "35 °C" }, { key: "humid", name: "Độ ẩm", val: "76 %" }]

export default function Control({data}) {
  // console.log("Control data",data);
  const router = useRouter();
  if (!data) {
    router.replace("/login");
  }

  const [state, setState] = useState(data);

  const socket = useSocketContext();
  useEffect(() => {
    initResponsiveDataListener(state, setState, socket);
  },[])

  return (<div className={styles.page}>
    <div className={styles.card}>
      <Card title="Bảng điều khiển">
        <ControlContent controlState={state}></ControlContent>
      </Card>
    </div>
  </div >)
}


Control.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export async function getServerSideProps(context) {
  // console.log(parsedCookies);
  const res = await axios.get(`${process.env.API_HOST}:${process.env.HTTP_PORT}/server/get-all-data`, {
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
      props: { data:res.data }
  };
}

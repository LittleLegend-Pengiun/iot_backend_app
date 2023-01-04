import Card from "../components/Card"
import Layout from "../layout/layout"
import ControlContent from "../components/ControlContent"
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { ServerUrl } from "../components/variable";
import { useSocketContext } from "../context/appWrapper";
import { getCookie } from "cookies-next";
import initResponsiveDataListener from "../components/ResponsiveData"

export default function Control({ data }) {
  const router = useRouter();
  if (!data) {
    router.replace("/login");
  }

  const [state, setState] = useState(data);
  const socket = useSocketContext();
  useEffect(() => {
    initResponsiveDataListener(state, setState, socket);
  }, [])

  const Lang = useSelector(state => state.language);
  const Styles = (useSelector(state => state.theme)).value().control;

  const jwtToken = getCookie("jwt-token");
  const cookie = `jwt-token=${jwtToken}`;

  return (<div className={Styles.page}>
    <div className={Styles.card}>
      <Card title={Lang.value().control_panel}>
        <ControlContent controlState={state} cookie={cookie}></ControlContent>
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

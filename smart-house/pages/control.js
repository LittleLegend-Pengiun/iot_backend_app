import Card from "../components/Card"
import Layout from "../layout/layout"
import ControlContent from "../components/ControlContent"
import { useSelector } from "react-redux";

export default function Control() {

  const Lang = useSelector(state => state.language);
  const Styles = (useSelector(state => state.theme)).value().control;

  return (<div className={Styles.page}>
    <div className={Styles.card}>
      <Card title={Lang.value().control_panel}>
        <ControlContent></ControlContent>
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
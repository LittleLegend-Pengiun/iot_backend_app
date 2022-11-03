import Card from "../components/Card"
import Layout from "../layout/layout"
import styles from "../styles/Control.module.css"
import ControlContent from "../components/ControlContent"
// const dataHouseState = [{ key: "temp", name: "Nhiệt độ", val: "35 °C" }, { key: "humid", name: "Độ ẩm", val: "76 %" }]

export default function Control() {
  return (<div className={styles.page}>
    <div className={styles.card}>
      <Card title="Bảng điều khiển">
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
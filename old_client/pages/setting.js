import Layout from "../layout/layout"
export default function Setting() {
  return<div>Hello setting!</div>
}


Setting.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
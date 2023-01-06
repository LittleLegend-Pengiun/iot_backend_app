import Card from "../components/Card"
import Layout from "../layout/layout"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { ServerUrl } from "../components/variable";
import { getCookie } from "cookies-next";


export default function Admin({ data }) {

  const Lang = useSelector(state => state.language);
  const Styles = (useSelector(state => state.theme)).value().admin;

  const currentUser = getCookie("username");

  const [users, setUsers] = useState(data);


  console.log(users);

  async function addaccount() {
    var Email = document.getElementById("idinput").value; //username from box
    var pass = document.getElementById("passinput").value; //password from box
    var name = document.getElementById("nameinput").value; //fullname from box
    //console.log(email + ", " + pass + ", " + name);
    const res = await axios.post(`${ServerUrl}users/create`, { username: `${name}`, email: `${Email}`, password: `${pass}`, age: 20 });
    console.log(res);
    await getAllData();
    addaccountpanelc();
  }

  const getAllData = async () => {
    const res = await axios.get(`${ServerUrl}users`);
    const newData = res.data;
    setUsers(newData)
  }

  return <div className={Styles.page}>
    <div className={Styles.card}>
      <Card title={<input type="button" value={Lang.value().abutton} id="intbl" onClick={addaccountpanel} className={Styles.abutton4} />}>

        <div className={Styles.overlay} id="overlay">
          <br></br><br></br><br></br><br></br><br></br><br></br>
          <center>
            <div className={Styles.container2}>
              {/* Add new user button (will call overlay panel) */}
              <div className={Styles.title2}>{Lang.value().abutton}</div>
              <div className={Styles.content2}>
                <input type="text" placeholder={Lang.value().fname} id="nameinput" className={Styles.abutton} />
                {/* Input password for new user */}
                <input type="text" placeholder={Lang.value().passwd} id="passinput" className={Styles.abutton} />

                <input type="text" placeholder={"Email"} id="idinput" className={Styles.abutton} />
                <br></br><br></br>
              </div>
              <br></br><br></br>
              {/* Confirm to add user button (Do stuff here) */}
              <input type="button" value={Lang.value().cre} id="sendbutton" onClick={addaccount} className={Styles.abutton2} />
              {/* Cancel button (go back, hide overlay panel) */}
              <input type="button" value={Lang.value().back} id="backbutton" onClick={addaccountpanelc} className={Styles.abutton3} />
              <br></br><br></br>
            </div>
          </center>
        </div>

        {/* The User Table Block ==================================================================================== */}
        {/* ========================================================================================================= */}
        <div className={Styles.container}>
          <div className={Styles.item}>
            <table className={Styles.styledtable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{Lang.value().fname}</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map(element => (
                    <tr key={element.id}>
                      <td>{element.id}</td>
                      <td>{element.username}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
        {/* The User Table Block ==================================================================================== */}
        {/* ========================================================================================================= */}

      </Card>
    </div>
  </div >;
}


{/* ADD NEW USER Block ====================================================================================== */ }
{/* ========================================================================================================= */ }
// Open Add Account Panel
function addaccountpanel() {
  document.getElementById("overlay").style.width = "100%";
}
// Close Add Account Panel
function addaccountpanelc() {
  document.getElementById("overlay").style.width = "0%";
}

export async function getServerSideProps(context) {
  const res = await axios.get(`${ServerUrl}users`);
  const newData = res.data;
  // console.log(res.data.isError);
  if (newData.isError) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin"
      }
    }
  }
  return {
    props: { data: newData }
  };
}
// Add Account Button Clicked (DO STUFF HERE) ================================================================
// ===========================================================================================================

{/* ADD NEW USER Block ====================================================================================== */ }
{/* ========================================================================================================= */ }


Admin.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
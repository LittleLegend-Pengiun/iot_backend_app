import styles from '../styles/layout.module.css'

import Drawer from '../components/Drawer';


export default function Layout({ children }) {
  return (
    <div>
      <Drawer></Drawer>
      <main className={styles.main}>{children}</main>

    </div>
  )
}
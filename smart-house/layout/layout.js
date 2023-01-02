import styles from '../styles/light/layout.module.css'
import styles2 from '../styles/dark/layout.module.css'
import Drawer from '../components/Drawer';

export default function Layout({ children }) {
  return (
      <div>
        <Drawer></Drawer>
        <main className={styles.main}>{children}</main>
      </div>
  )
}
import '../styles/globals.css'
import { AppWrapper } from '../context/appWrapper'

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  )
}
import { WrappedBuildError } from 'next/dist/server/base-server'
import '../styles/light/globals.css'
import '../styles/dark/globals.css'
import { createWrapper } from "next-redux-wrapper";
import store from '../app/store';
import { Provider } from "react-redux";
import { AppWrapper } from '../context/appWrapper'

function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (<Provider store={store}>
    {getLayout(
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    )}
  </Provider>)
 
}

export default MyApp
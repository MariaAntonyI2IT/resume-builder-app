import '../src/client/styles/globals.scss';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { wrapper } from './../src/client/store';
import { ToastContainer, toast } from 'react-toastify';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer autoClose={1000}/>
    </>

  )
}

export default wrapper.withRedux(MyApp);

import "bootstrap/dist/css/bootstrap.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../store/";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

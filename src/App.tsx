import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import styles from "./App.module.css";
import { Map } from "./components";

export const App = () => {
  return (
    <div className={styles.appContainer}>
      <Map />
      <ToastContainer position="top-center" hideProgressBar newestOnTop theme="colored" />
    </div>
  );
};

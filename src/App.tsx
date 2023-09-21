import "./App.css";
import styles from "./App.module.css";
import { Map } from "./components";

export const App = () => {
  return (
    <div className={styles.appContainer}>
      <Map />
    </div>
  );
};

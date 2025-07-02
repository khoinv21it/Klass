import styles from "./CardScore.module.css";
import { MoreHorizontal } from "lucide-react";
export const CardScore = () => {
  return (
    <div className={styles.card}>
      <div className={styles.rowOne}>
        <span className={styles.number}>7'</span>
        <span>
          <MoreHorizontal />
        </span>
      </div>
      <div className={styles.rowTwo}>
        <div className={styles.colLeft}>
          <span>Spain</span>
          <img src="/images/spanish.png" className={styles.img} />
        </div>
        <span className={styles.ratio}>0 : 0</span>
        <div className={styles.colRight}>
          <span>France</span>
          <img src="/images/france.png" className={styles.img} />
        </div>
      </div>
    </div>
  );
};

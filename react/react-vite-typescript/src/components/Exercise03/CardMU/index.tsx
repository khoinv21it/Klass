import { MoreHorizontal } from "lucide-react";
import styles from "./CardMU.module.css";
export const CardMU = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.leftCol}>
        <img src="/images/mu.png" className={styles.img}></img>
        <span>Manchester United</span>
      </div>
      <span className={styles.rightCol}>
        <MoreHorizontal />
      </span>
    </div>
  );
};
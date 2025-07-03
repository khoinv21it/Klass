import { EyeOff } from 'lucide-react';
import styles from "./CardInfo.module.css";
export const CardInfo = () => {
  return (
    <div className={styles.cardContainer}>
      <img className={styles.img} src="images/avatar.png"></img>
      <div className={styles.cRightCol}>
        <span className={styles.name}>Wade Warren</span>
        <div className={styles.row}>
          <div className={styles.leftCol}>
            <span className={styles.visa}>VISA</span>
            <span>4293 3242 ***</span>
          </div>
          <div className={styles.rightCol}>
            <span>
              <EyeOff />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
import styles from "./CardNike.module.css";

type CardNikeProps = {
  logoUrl: string;
  storeName: string;
  description?: string;
  amount: string;
  time: string;
};
export default function CardNike({
  logoUrl,
  storeName,
  description,
  amount,
  time,
}: CardNikeProps) {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <img src={logoUrl} alt="logo" className={styles.logo} />
        <div className={styles.textContent}>
          <p className={styles.title}>{storeName}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <div className={styles.right}>
        <p className={styles.amount}>{amount}</p>
        <p className={styles.time}>{time}</p>
      </div>
    </div>
  );
}

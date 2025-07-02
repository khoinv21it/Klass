import styles from "./CardNotification.module.css";

type CardNotificationProps = {
  message: string;
  count: number;
};
export default function CardNotification({
  message,
  count,
}: CardNotificationProps) {
  return (
    <div className={styles.card}>
      <p className={styles.message}>{message}</p>

      <div className={styles.notification}>
        <div className={styles.divider} />
        <span className={styles.icon}>🔔</span>
        <span className={styles.count}>{count}</span>
      </div>
    </div>
  );
}

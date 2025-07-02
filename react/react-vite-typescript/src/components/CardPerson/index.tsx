import styles from "./CardPerson.module.css";

type CardPersonProps = {
  bgCorlor: string;
  avatarUrls: string[];
  title: string;
  subtitle?: string;
};

export const CardPerson = ({
  bgCorlor,
  avatarUrls,
  title,
  subtitle,
}: CardPersonProps) => {
  return (
    <div className={styles.card} style={{ backgroundColor: bgCorlor }}>
      <div className={styles.left}>
        <div className={styles.avatarGroup}>
          {avatarUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              className={styles.avatar}
              style={{ zIndex: index }}
              alt={`Avatar ${index}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.right}>
        <p className={styles.title}>{title}</p>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </div>
  );
};

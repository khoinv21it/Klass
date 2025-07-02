import { MoreHorizontal } from "lucide-react";
import styles from "./CardDashBoard.module.css";

type CardDashBoardProps = {
  tags: string[];
  title: string;
  description: string;
  progress: number;
};
export const CardDashBoard = ({
  tags,
  title,
  description,
  progress
}: CardDashBoardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.tags}>
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className={`${styles.tag} ${
                tag === "Highlight" ? styles.highlight : styles.feed
              }`}
            >
              {tag}
            </span>
          ))}
          <MoreHorizontal size={18} />
        </div>
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <div className={styles.footer}>
        <div className={styles.progressBar}>
          <div className={styles.progress} style={{ width: `${progress}%` }} />
        </div>
        <span className={styles.percent}>{progress}%</span>
      </div>
    </div>
  );
};

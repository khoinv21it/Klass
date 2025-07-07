
import styles from "./AccessoryCard.module.css";

type Props = {
    imgUrl: string;
    percentage?: number;
  titleName: string;
  price: string;
  discount?: string;
};

export default function AccessoryCard({imgUrl,percentage, titleName, price, discount }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.thumnails}>
        <img src={imgUrl} alt="" />
        <span className={styles.label}>{percentage}%</span>
      </div>
      <p>{titleName}</p>
      <div className={styles.prices}>
        <span className={styles.price}>{price}đ</span>
        <span className={styles.discount}>{discount}đ</span>
      </div>
    </div>
  );
}

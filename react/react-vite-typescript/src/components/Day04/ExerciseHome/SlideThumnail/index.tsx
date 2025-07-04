import React from "react";
import styles from "./SlideThumnail.module.css";
import { FaAngleLeft } from "react-icons/fa";

type Props = {
    index?: number;
};

export default function SlideThumnail({ index }: Props) {
    const imgs = [1, 2, 3, 4, 5];
    const [indexImg, setIndexImg] = React.useState(index || 1);
    const path = `images/day04/${indexImg}.jpg`;

    const handlePrev = () => {
        setIndexImg((prev) => (prev > 1 ? prev - 1 : imgs.length));
    }

    const handleNext = () => {
        setIndexImg((prev) => (prev < imgs.length ? prev + 1 : 1));
    }

    const handleItem = (item: number) => setIndexImg(item);

  return (
    <div className={styles.container}>
      <div className={styles.rowOne}>
        <button className={styles.buttonRight} onClick={handlePrev}>
          <FaAngleLeft />
        </button>
        <img className={styles.img} src={path}></img>
        <button className={styles.buttonLeft} onClick={handleNext}>
          <FaAngleLeft />
        </button>
      </div>
      <div className={styles.rowTwo}>
        {imgs.map((item, index) => (
          <img
            key={index}
            className={`${styles.imgThumbnail} ${
              item === indexImg ? styles.imgBoder : ""
            }`}
            src={`images/day04/${item}.jpg`} onClick={() => handleItem(item)}
          ></img>
        ))}
      </div>
    </div>
  );
}

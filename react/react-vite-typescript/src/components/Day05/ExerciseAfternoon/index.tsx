import React from "react";
import Exercise09 from "./Exercise09";
import styles from "./d5.module.css";
import Exercise02 from "./Exercise02";
import { Exercise03 } from "./Exercise03";
import Exercise04 from "./Exercise04";
import Exercise05 from "./Exercise05";
import Exercise06 from "./Exercise06";
import Exercise07 from "./Exercise07";
import Exercise08 from "./Exercise08";
import Exercise10 from "./Exercise10";

type Props = {};

export default function ExerciseAfternoon({}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Exercise 1</h2>
        <Exercise09 />
      </div>
      <div className={styles.box}>
        <h2>Exercise 2</h2>
        <Exercise02 />
      </div>
      <div className={styles.box}>
        <h2>Exercise 3</h2>
        <Exercise03 />
      </div>
      <div className={styles.box}>
        <h2>Exercise 4</h2>
        <Exercise04 />
      </div>
      <div className={styles.box}>
        <h2>Exercise 5</h2>
        <Exercise05 />
      </div>
      <div className={styles.box}>
        <h2>Exercise 6</h2>
        <Exercise06 />
      </div>
      <div className={styles.box}>
        <h2>Exercise 7</h2>
        <Exercise07 />
      </div>
      <div className={styles.box}>
        <h2>Exercise 8</h2>
        <Exercise08 />
      </div>
      <div className={styles.box}>
        <h2>Exercise 9</h2>
        <Exercise09 />
      </div>
      <div className={styles.box}>
        <h2>Exercise 10</h2>
        <Exercise10 />
      </div>
    </div>
  );
}

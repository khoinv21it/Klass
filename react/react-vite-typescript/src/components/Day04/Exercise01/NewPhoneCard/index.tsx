import React from 'react'
import styles from './NewPhoneCard.module.css'

type Props = {
  imgUrl: string;
    titleName: string;
    numberOfViews: number;
}

export default function NewPhoneCard({imgUrl, titleName, numberOfViews = 0}: Props) {

  return (
    <div className={styles.card}>
        <img src={imgUrl} alt="" />
        <p className={styles.title}>{titleName}</p>
        <span className={styles.views}>{numberOfViews} views</span>
    </div>
  )
}
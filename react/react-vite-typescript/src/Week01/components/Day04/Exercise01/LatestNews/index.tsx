import styles from "./LatestNews.module.css";
import NewPhoneCard from "../NewPhoneCard";

const cardContent = [
  {
    imgUrl: 'images/sontung.jpg',
    titleName:
      "Ấn tượng đầu tiên Samsung Galaxy A32 4G: Với hơn 6 triệu đã có màn hình Super AMOLED 90Hz",
    numberOfViews: 140,
  },
  {
    imgUrl: 'images/sontung.jpg',
    titleName:
      "Ấn tượng đầu tiên Samsung Galaxy A32 4G: Với hơn 6 triệu đã có màn hình Super AMOLED 90Hz",
    numberOfViews: 140,
  },
  {
    imgUrl: 'images/sontung.jpg',
    titleName:
      "Ấn tượng đầu tiên Samsung Galaxy A32 4G: Với hơn 6 triệu đã có màn hình Super AMOLED 90Hz",
    numberOfViews: 140,
  },
  {
    imgUrl: 'images/sontung.jpg',
    titleName:
      "Ấn tượng đầu tiên Samsung Galaxy A32 4G: Với hơn 6 triệu đã có màn hình Super AMOLED 90Hz",
    numberOfViews: 140,
  },
];

type Props = {};

function LatestNews({}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1 style={{color:'black', marginLeft: '80px'}}>Tin mới</h1>
        <span className={styles.more}>Xem thêm</span>
      </div>
      <div className={styles.cardContainer}>
      {cardContent.map((item, index) => (
        <NewPhoneCard
                key={index}
                imgUrl={item.imgUrl || ''}
                titleName={item.titleName}
                numberOfViews={item.numberOfViews}
            />
        ))}
      </div>
    
    </div>
  );
}

export default LatestNews;

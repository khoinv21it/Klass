import LatestNews from "./Exercise01/LatestNews";
import AccessoryCard from "./Exercise02/AccessoryCard";
import ButtonChooseColor from "./Exercise03/ButtonChooseColor";
import Rating from "./Exercise03/Rating";
import SeenProduct from "./Exercise03/SeenProduct";
import { LikeButton } from "./ExerciseHome/LikeButton";
import SlideThumnail from "./ExerciseHome/SlideThumnail";
import TabSwitcher from "./ExerciseHome/TabSwitcher";

export default function Day04() {
  return (
    <section
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* <LatestNews /> */}

      {/* <div style={{ display: "flex", gap: "30px" }}>
        <AccessoryCard
          imgUrl="images/day04/Apple-USBC-To-SDCard-A.jpg"
          percentage={-25}
          titleName="Cáp chuyển đổi USB-C sang SD"
          price="1.290.000"
          discount="790.000"
        />
        <AccessoryCard
          imgUrl="images/day04/Apple-USBC-To-SDCard-A.jpg"
          percentage={-25}
          titleName="Cáp chuyển đổi USB-C sang SD"
          price="1.290.000"
          discount="790.000"
        />
        <AccessoryCard
          imgUrl="images/day04/Apple-USBC-To-SDCard-A.jpg"
          percentage={-25}
          titleName="Cáp chuyển đổi USB-C sang SD"
          price="1.290.000"
          discount="790.000"
        />
        <AccessoryCard
          imgUrl="images/day04/Apple-USBC-To-SDCard-A.jpg"
          percentage={-25}
          titleName="Cáp chuyển đổi USB-C sang SD"
          price="1.290.000"
          discount="790.000"
        />
      </div> */}

      {/* <ButtonChooseColor /> */}

      <div style={{ alignSelf: "flex-start" }}>
        <LikeButton />

        <Rating />
      </div>

      {/* <SeenProduct ImageUrl="images/day04/iphone-16-pro-titan-trang.png" Name="vivo Y18 8GB/128GB" Price="4.410.000"/> */}
      <div style={{ width: "700px" }}>
        <SlideThumnail />
      </div>

      <TabSwitcher type="block" />
      <TabSwitcher type="underline" />
    </section>
  );
}

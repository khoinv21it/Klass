import { Filter, Globe, Phone, Search, Smile } from "lucide-react"
import GetAppleButton from "./Exercise01/GetAppleButton"
import GetFacebookButton from "./Exercise01/GetFacebookButton"
import GetGoogleButton from "./Exercise01/GetGoogleButton"
import GetStartedButton from "./Exercise01/GetStartedButton"
import { SearchInput } from "./Exercise02/SearchInput"
import { CardScore } from "./Exercise03/CardScore"
import { CardMU } from "./Exercise03/CardMU"
import { CardInfo } from "./Exercise03/CardInfo"
import { CardDashBoard } from "./Exercise03/CardDashBoard"
import { CardPerson } from "./Exercise05/CardPerson"
import CardNike from "./Exercise06/CardNike"
import CardNotification from "./Exercise06/CardNotification"

// import styleK from './k.module.css'
type Props = {}

export default function Day03() {
  return (
    <div className="c">
      <div className="d">
        <GetStartedButton />
        <GetAppleButton />
        <GetGoogleButton />
        <GetFacebookButton />
        {/* <h1 className={styleK.heading}>Hello React!</h1>
        <img height={160} width={160} src="images/xiaomi1.jpg" alt="" /> */}
      </div>
      <div className="d">
        <SearchInput leftIcon={<Search />} />
        <SearchInput leftIcon={<Search />} placeholder="Search" />
        <SearchInput
          leftIcon={<Search />}
          placeholder="Textfield"
          boldPlaceholder
        />
        <SearchInput
          leftIcon={<Search />}
          placeholder="Search in the web"
          rightIcon={<Smile />}
        />
        <SearchInput
          leftIcon={<Search />}
          placeholder="Search crypto"
          rightIcon={<Filter />}
        />
        <SearchInput placeholder="Phone number" rightIcon={<Phone />} />
        <SearchInput
          leftIcon={<Search />}
          placeholder="Search in the web"
          rightIcon={<Globe />}
        />
      </div>

      <div className="d">
        <CardScore />
        <CardMU />
        <CardInfo />
        <CardDashBoard
          title="Dashboard"
          description="Business management service"
          tags={["Highlight", "Feeds"]}
          progress={70}
        />
      </div>

      <div className="d">
        <CardPerson
          bgCorlor="#00CFE8"
          avatarUrls={["images/avatar1.png"]}
          title="Miriam Jimenez"
        />
        <CardPerson
          bgCorlor="#933FFE"
          avatarUrls={[
            "images/avatar2.png",
            "images/avatar3.png",
            "images/avatar4.png",
          ]}
          title="Teams"
          subtitle="Two currently"
        />

        <CardPerson
          bgCorlor="#FEEB00"
          avatarUrls={["images/avatar5.png", "images/avatar6.png"]}
          title="New Teams"
        />
      </div>
      <div className="d">
        <CardNike
          logoUrl="/images/nike_logo.png"
          storeName="Nike store"
          description="6 months of promotions"
          time="11:00AM"
          amount="-27.50"
        />

        <CardNotification message="All your notifications are well turned on" count={4}/>
      </div>
    </div>
  )
}
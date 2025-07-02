import "./App.css";
// import styleK from './k.module.css'
import { Filter, Globe, Phone, Search, Smile } from "lucide-react";
import GetStartedButton from "./components/ComponentP1/GetStartedButton";
import GetAppleButton from "./components/ComponentP1/GetAppleButton";
import GetGoogleButton from "./components/ComponentP1/GetGoogleButton";
import GetFacebookButton from "./components/ComponentP1/GetFacebookButton";
import { SearchInput } from "./components/SearchInput";
import { CardDashBoard } from "./components/CardDashBoard";
import { CardPerson } from "./components/CardPerson";
import CardNike from "./components/CardNike";
import CardNotification from "./components/CardNotification";

function App() {
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
      <hr />
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
  );
}

export default App;

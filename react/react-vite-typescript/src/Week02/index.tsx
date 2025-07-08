import React from "react";
import CRUD from "./components/Day06/CRUDIndex";
import WheatherDisplay from "./components/Day06/WheatherDisplay";
import { BrowserRouter } from "react-router";
import AfternoonEx from "./components/Day07/AfternoonEx/indexRouter";
import Homework from "./components/Day07/Homework/indexRouter";

type Props = {};

export default function Week02({}: Props) {
  return (
    // <div>
    //   {/* <CRUD /> */}
    //   {/* <WheatherDisplay /> */}

    // </div>
    <BrowserRouter>
      {/* <AfternoonEx /> */}
      <Homework />
    </BrowserRouter>
  );
}

import React from "react";
import FillerSideBar from "../components/FillerSideBar";
import { Outlet } from "react-router";

type Props = {};

export default function ProductPage({}: Props) {
  return (
    <div className="flex flex-1 gap-4 bg-white">
      <FillerSideBar />
      <div className="w-[80%] flex flex-wrap">
        <span className="font-semibold text-lg">Danh sách sản phẩm</span>
        <Outlet />
      </div>
    </div>
  );
}

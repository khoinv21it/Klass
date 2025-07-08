import React from "react";
import { IoMdAdd } from "react-icons/io";

type Props = {};

export default function LogoNavBar({}: Props) {
  return (
    <div className="flex items-center justify-around pt-3 pb-7">
      <div className="flex items-center gap-x-3">
        <div className="p-3 bg-sky-600 rounded-xl">
          <IoMdAdd />
        </div>
        <p className="text-2xl font-bold">H-Care</p>
      </div>
    </div>
  );
}
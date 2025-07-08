import React from 'react';
import { RiFindReplaceLine } from "react-icons/ri";

type Props = {};

export default function Search({}: Props) {
  return (
    <div className="flex items-center border border-sky-950 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 ml-6">
      <RiFindReplaceLine className="text-gray-500 text-xl" />
      <input
        type="text"
        placeholder="Text here to find..."
        className="flex-1 outline-none pl-2"
      />
    </div>
  );
}
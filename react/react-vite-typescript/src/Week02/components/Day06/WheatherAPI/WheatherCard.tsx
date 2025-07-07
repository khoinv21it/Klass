import React from "react";

type Props = {
  temp: number;
  condition: string;
  icon: string;
  humidity: number;
  wind: number;
};

export default function WheatherCard({
  temp,
  condition,
  icon,
  humidity,
  wind,
}: Props) {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-blue-200 to-blue-400 rounded-3xl p-6 shadow-lg w-full">
      <div className="flex flex-col items-center mb-4">
        <span className="text-6xl font-bold text-white">{temp}&deg;</span>
        <img src={icon} alt={condition} className="w-16 h-16 my-2" />
        <span className="text-xl text-white font-semibold">{condition}</span>
      </div>
      <div className="flex w-full justify-between mt-2">
        <div className="flex flex-col items-center bg-white bg-opacity-40 rounded-xl px-4 py-2 w-1/2 mr-2">
          <span className="text-sm text-gray-700">Humidity</span>
          <span className="text-lg font-bold text-gray-900">{humidity}%</span>
        </div>
        <div className="flex flex-col items-center bg-white bg-opacity-40 rounded-xl px-4 py-2 w-1/2 ml-2">
          <span className="text-sm text-gray-700">Wind</span>
          <span className="text-lg font-bold text-gray-900">{wind} km/h</span>
        </div>
      </div>
    </div>
  );
}

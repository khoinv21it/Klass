import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

export default function SearchBar({ value, onChange, onSearch }: Props) {
  return (
    <div className="w-full flex justify-center mt-4 mb-6">
      <div className="relative w-11/12">
        <input
          type="text"
          className="w-full rounded-2xl py-3 pl-12 pr-4 bg-white bg-opacity-30 text-lg placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search for a city..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

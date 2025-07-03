import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

type Props = {
  stars?: number;
};

export default function Rating({ stars = 0 }: Props) {
  const [rating, setRating] = useState(stars);
  const [hover, setHover] = useState(0);
  const [label, setLabel] = useState("");

  const descriptions = ["Tệ", "Khá Tệ", "Bình thường", "Tốt", "Rất Tốt"];

  const handleClick = (index: number) => {
    if (rating === index) {
      setRating(0);
    } else {
      setRating(index); 
    }
  };

  const handleMouseEnter = (index: number) => {
    setHover(index);
    setLabel(descriptions[index - 1]);
  };

  const handleMouseLeave = () => {
    setHover(0);
    setLabel("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
      <div style={{ display: "flex", gap: "2px" }}>
        {[1, 2, 3, 4, 5].map((item, index) => (
          <span
            key={index}
            style={{
              cursor: "pointer",
              color: (hover || rating) >= item ? "orange" : "gray",
              transition: "color 0.2s",
            }}
            onClick={() => handleClick(item)}
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={handleMouseLeave}
          >
            <FaStar />
          </span>
        ))}
      </div>
      <span style={{ fontSize: "14px", color: "gray", minHeight: "18px" }}>
        {label}
      </span>
    </div>
  );
}

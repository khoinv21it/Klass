import React from "react";

type Props = {};

export default function Exercise04({}: Props) {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      style={{
        padding: "20px",
        color: "white",
        // width: "40px",
        backgroundColor: `${isHovered ? "yellow" : "gray"}`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Hover me!
    </div>
  );
}

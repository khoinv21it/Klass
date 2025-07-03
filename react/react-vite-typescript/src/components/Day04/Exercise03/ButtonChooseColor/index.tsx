import React, { useState } from "react";
import styles from "./ButtonChooseColor.module.css";

type Props = {};

export default function ButtonChooseColor({}: Props) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const colors = ["Black", "Pink", "Blue"];

  const handleColorChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const color = event.currentTarget.textContent;
    setSelectedColor(color);
  };

  const getButtonStyle = (color: string) => ({
    padding: "10px 20px",
    border: `3px solid ${
      selectedColor === color ? color.toLowerCase() : "#ccc"
    }`,
    borderRadius: "5px",
    cursor: "pointer",
    transition: "border-color 0.3s ease, background-color 0.3s ease",
  });

  return (
    <div className={styles.color_selector}>
      {colors.map((color) => (
        <button
          key={color}
          style={getButtonStyle(color)}
          onClick={handleColorChange}
        >
          {color}
        </button>
      ))}
    </div>
  );
}

import React, { useState } from "react";
import { FiX } from "react-icons/fi";

type Props = {Name: string; Price: string; ImageUrl: string;};

export default function SeenProduct({Name,Price,ImageUrl}: Props) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      style={{
        display: "flex",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "8px",
        position: "relative",
        alignItems: "center",
        width: "240px",
      }}
    >

      <button
        onClick={() => setVisible(false)}
        style={{
          position: "absolute",
          top: "4px",
          right: "4px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "#888",
        }}
      >
        <FiX size={18} />
      </button>

      <img
        src={ImageUrl}
        alt="product"
        style={{
          width: "50px",
          height: "50px",
          objectFit: "cover",
          borderRadius: "4px",
        }}
      />

      <div style={{ marginLeft: "8px" }}>
        <div style={{ fontSize: "14px", fontWeight: 'semibold' }}>{Name}</div>
        <div style={{ color: "red", fontWeight: "bold" }}>{Price}</div>
      </div>
    </div>
  );
}

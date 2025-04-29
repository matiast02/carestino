"use client";

import { useState, useEffect } from "react";

const colorMap = {
  pink: { active: "bg-pink-400", hover: "hover:bg-pink-500" },
  red: { active: "bg-red-400", hover: "hover:bg-red-500" },
  orange: { active: "bg-orange-400", hover: "hover:bg-orange-500" },
  purple: { active: "bg-purple-400", hover: "hover:bg-purple-500" },
  cyan: { active: "bg-cyan-400", hover: "hover:bg-cyan-500" },
  white: { active: "bg-white", hover: "hover:bg-gray-200" },
};

export default function Cell({ size = 10, color = "white", isDragging }) {
  const [isActive, setActive] = useState(false);
  const [cellColor, setCellColor] = useState(color);

  useEffect(() => {
    if (!isActive) setCellColor(color);
  }, [color, isActive]);

  const toggle = () => {
    setActive((prev) => !prev);
    setCellColor(color);
  };

  const handleMouseEnter = () => {
    if (isDragging) {
      console.log("arrastrando");
      setActive(true);
      setCellColor(color);
    }
  };

  const { active, hover } = colorMap[cellColor] || colorMap.white;
  return (
    <div
      style={{ width: size, height: size }}
      className={`flex border border-black cursor-pointer transition-all hover:scale-110 ${hover} ${
        isActive ? active : "bg-white"
      }`}
      onClick={toggle}
      onMouseEnter={handleMouseEnter}
    ></div>
  );
}

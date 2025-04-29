"use client";

import { useEffect, useState } from "react";

export default function ColorSelector({ handleColor, visible = false, show }) {
  const [active, setActive] = useState("pink");
  const onSelect = (color) => {
    handleColor(color);
    setActive(color);
  };

  if (!visible) return null;

  const colors = ["pink", "red", "orange", "purple", "cyan"];
  return (
    <div
      className="flex flex-row gap-2 p-2 absolute top-[90%] left-[40%] bg-white border-black border shadow-md"
      onMouseLeave={() => show(false)}
    >
      {colors.map((color) => (
        <div
          key={color}
          className={`size-12 border border-black bg-${color}-400 ${
            active === color && "border-4"
          } `}
          onClick={() => onSelect(color)}
        ></div>
      ))}
    </div>
  );
}

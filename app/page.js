"use client";

import { useEffect, useState } from "react";
import ColorSelector from "./ColorSelector";
import Grid from "./Grid";

export default function Home() {
  const [color, setColor] = useState("pink");
  const [showColorsSelector, setShowColorsSelector] = useState(false);
  const toggleShowColorSelector = () => setShowColorsSelector((prev) => !prev);

  useEffect(() => {
    const handleRightClick = (e) => {
      e.preventDefault();
      toggleShowColorSelector();
    };

    window.addEventListener("contextmenu", handleRightClick);

    return () => {
      window.removeEventListener("contextmenu", handleRightClick);
    };
  }, []);

  return (
    <div className="relative">
      <Grid color={color} />
      <ColorSelector
        handleColor={setColor}
        visible={showColorsSelector}
        show={setShowColorsSelector}
      />
    </div>
  );
}

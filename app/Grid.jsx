"use client";
import { useState, useEffect } from "react";
import Cell from "./Cell";

export default function Grid({ color }) {
  const [cellWidth, setCellWidth] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const totalCols = 100;

  useEffect(() => {
    const updateGrid = () => {
      const width = window.screen.availWidth;
      const height = window.innerHeight;
      const newCellWidth = Math.floor(width / totalCols);
      const newTotalRows = Math.floor(height / newCellWidth);
      setCellWidth(newCellWidth);
      setTotalRows(newTotalRows);
      console.log("Calculated newCellWidth:", newCellWidth);
      console.log("Calculated newTotalRows:", newTotalRows);
    };
    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => {
      window.removeEventListener("resize", updateGrid);
    };
  }, []);

  useEffect(() => {
    console.log("cellWidth updated:", cellWidth);
    console.log("totalRows updated:", totalRows);
  }, [cellWidth, totalRows]);

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (e.button === 0) setIsDragging(true);
    };

    const handleMouseUp = (e) => {
      if (e.button === 0) setIsDragging(false);
    };
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Only render the grid when cellWidth and totalRows are set
  if (cellWidth === 0 || totalRows === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen">
      {Array.from({ length: totalRows }, (_, rowIdx) => (
        <div
          key={`row-${rowIdx}`}
          className="flex w-full"
          style={{ height: `${cellWidth}px` }}
        >
          {Array.from({ length: totalCols }, (_, colIdx) => (
            <Cell
              key={`cell-${rowIdx}-${colIdx}`}
              size={cellWidth}
              color={color}
              isDragging={isDragging}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

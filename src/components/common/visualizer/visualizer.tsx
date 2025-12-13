import React, { useEffect, memo } from "react";
import { SortingAlgorithm } from "./types/algorithm.type";
import { useVisualizer } from "hooks/visualizer/use.visualizer";

interface IProps {
  algorithm: SortingAlgorithm;
  count?: number;
  speed?: number;
  width?: number | string;
  height?: number | string;
  className?: string;
  onSortComplete?: () => void;
}

export const VisualizeSorting: React.FC<IProps> = memo((props) => {
  const {
    algorithm,
    count = 25,
    speed = 50,
    width = "100%",
    height = "200px",
    className = "",
    onSortComplete,
  } = props;

  const { activeIndices, bars, generateBars, isSorting, startSorting, delay } =
    useVisualizer({ algorithm, count, onSortComplete, speed });

  useEffect(() => {
    startSorting();
  }, [algorithm, delay, generateBars, onSortComplete]);

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${className}`}
      style={{ width, height }}
    >
      <div className="absolute inset-0 flex items-end gap-[2px] p-4">
        {bars.map((value, index) => (
          <div
            key={index}
            className={`flex-1 min-w-[8px] rounded-t-lg transition-all duration-300 ease-out ${
              activeIndices.includes(index)
                ? "bg-gradient-to-t from-yellow-400 to-yellow-300"
                : "bg-gradient-to-t from-blue-500 to-blue-400"
            }`}
            style={{
              height: `${value}%`,
            }}
          />
        ))}
      </div>

      {isSorting && (
        <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-white font-medium">
              Сортировка...
            </span>
          </div>
        </div>
      )}
    </div>
  );
});

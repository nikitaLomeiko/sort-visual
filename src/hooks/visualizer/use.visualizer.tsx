import { useCallback, useState } from "react";
import { SortingAlgorithm } from "../../components/common/visualizer/types/algorithm.type";

interface IProps {
  algorithm: SortingAlgorithm;
  count: number;
  speed?: number;
  onSortComplete?: () => void;
}

export const useVisualizer = ({
  count,
  algorithm,
  onSortComplete,
  speed = 50,
}: IProps) => {
  const [bars, setBars] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  const updateElementState = useCallback(
    (indices: number[], state: "active" | "sorted" | "default") => {
      setActiveIndices(indices);
      console.log(state);
    },
    []
  );

  const generateBars = useCallback(() => {
    const newBars = Array.from(
      { length: count },
      () => Math.floor(Math.random() * 85) + 15
    );
    setBars(newBars);
    return newBars;
  }, [count]);

  const delay = useCallback(async () => {
    const delayMs = 1000 - speed * 10;
    return new Promise((resolve) => setTimeout(resolve, delayMs));
  }, [speed]);

  const startSorting = async () => {
    const initialBars = generateBars();
    setIsSorting(true);

    try {
      await algorithm([...initialBars], setBars, updateElementState, delay);
      onSortComplete?.();
    } finally {
      setIsSorting(false);
      setActiveIndices([]);
    }
  };

  return { bars, isSorting, activeIndices, generateBars, startSorting, delay };
};

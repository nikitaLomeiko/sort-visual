export type SortingAlgorithm = (
  array: number[],
  updateArray: (arr: number[]) => void,
  updateElementState: (
    indices: number[],
    state: "active" | "sorted" | "default"
  ) => void,
  delay: () => Promise<unknown>
) => Promise<void>;

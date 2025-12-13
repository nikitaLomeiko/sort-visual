import { SortingAlgorithm } from "components/common/visualizer/types/algorithm.type";

export interface IAlgorithmItem {
  id: number;
  codeName: string;
  codeView: string;
  algorithm: SortingAlgorithm;
  info: string;
}

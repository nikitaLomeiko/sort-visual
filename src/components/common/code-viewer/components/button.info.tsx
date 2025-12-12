import { Info } from "lucide-react";

interface IProps {
  handleInfo: () => void;
}

export const ButtonInfo: React.FC<IProps> = ({ handleInfo }) => {
  return (
    <button
      onClick={handleInfo}
      className="cursor-pointer flex items-center gap-2 sm:px-3 px-2 py-2 font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-lg"
    >
      <Info className="w-4 h-4" />
      <span>Info</span>
    </button>
  );
};

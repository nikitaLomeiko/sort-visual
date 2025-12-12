import { Play } from "lucide-react";

interface IProps {
  handleRun: () => void;
}

export const ButtonRun: React.FC<IProps> = ({ handleRun }) => {
  return (
    <button
      onClick={handleRun}
      className="cursor-pointer flex items-center gap-2 sm:px-3 px-2 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200 shadow-lg"
    >
      <Play className="w-4 h-4" />
      <span>Run</span>
    </button>
  );
};

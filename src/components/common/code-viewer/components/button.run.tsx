import { Play, Pause } from "lucide-react";
import { useState } from "react";

interface IProps {
  toggleRun: () => void;
}

export const ButtonRun: React.FC<IProps> = ({ toggleRun }) => {
  const [isRun, setRun] = useState<boolean>(false);

  const handleToggleRun = () => {
    toggleRun();
    setRun(!isRun);
  };

  return (
    <button
      onClick={handleToggleRun}
      className={`cursor-pointer flex items-center gap-2 sm:px-3 px-2 py-2 text-sm font-medium text-white ${
        isRun
          ? "bg-red-600 hover:bg-red-700"
          : "bg-green-600 hover:bg-green-700"
      } rounded-lg transition-colors duration-200 shadow-lg`}
    >
      {isRun ? (
        <>
          <Pause className="w-4 h-4" />
          <span>Stop</span>
        </>
      ) : (
        <>
          <Play className="w-4 h-4" />
          <span>Run</span>
        </>
      )}
    </button>
  );
};

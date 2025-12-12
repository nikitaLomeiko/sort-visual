import { Check, Copy } from "lucide-react";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

interface IProps {
  code: string;
}

export const ButtonCopied: React.FC<IProps> = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <CopyToClipboard text={code} onCopy={handleCopy}>
      <button className="cursor-pointer flex items-center gap-2 sm:px-3 px-2 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200 shadow-lg">
        {isCopied ? (
          <>
            <Check className="w-4 h-4" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            <span>Copy</span>
          </>
        )}
      </button>
    </CopyToClipboard>
  );
};

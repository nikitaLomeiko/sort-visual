import { CodeViewer } from "components/common/code-viewer/code.viewer";
import { VisualizeSorting } from "components/common/visualizer/visualizer";
import { IAlgorithmItem } from "data/alogorithms/types/algorithm.list.type";
import { Info } from "lucide-react";
import { useState } from "react";

export const AlgorithmPlayground: React.FC<IAlgorithmItem> = (props) => {
  const { algorithm, codeName, codeView, info } = props;
  const [isRunned, setRunned] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-5">
      {isRunned && (
        <div className="slide-fade-in">
          <VisualizeSorting
            algorithm={algorithm}
            count={25}
            speed={70}
            height="250px"
            className="mb-2"
          />
          <div className="inline-flex items-start gap-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <Info className="h-4 w-4 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              {info}
            </span>
          </div>
        </div>
      )}
      <CodeViewer
        toggleRun={() => setRunned(!isRunned)}
        code={codeView}
        title={codeName}
        language="js"
      />
    </div>
  );
};

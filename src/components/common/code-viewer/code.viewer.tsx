import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { ButtonCopied } from "./components/button.copied";
import { CodeWrapper } from "./components/code.wrapper";
import { ButtonRun } from "./components/button.run";
import { useTheme } from "components/providers/theme-provider/theme.provider";
import { ButtonInfo } from "./components/button.info";

interface IProps {
  code: string;
  title: string;
  showLineNumbers?: boolean;
  language?: string;
}

export const CodeViewer: React.FC<IProps> = (props) => {
  const {
    code,
    title,
    showLineNumbers = true,
    language = "javascript",
  } = props;

  const { currentTheme } = useTheme();

  return (
    <CodeWrapper title={title}>
      <div className="sm:text-sm text-[8px]">
        <SyntaxHighlighter
          language={language}
          style={currentTheme === "light" ? oneLight : oneDark}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: "1.5rem",
            minHeight: "200px",
            borderRadius: 0,
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>

      <div className="absolute top-4 right-4 flex flex-row center gap-2 opacity-75 sm:text-sm text-xs">
        <ButtonRun handleRun={() => null} />
        <ButtonInfo handleInfo={() => null} />
        <ButtonCopied code={code} />
      </div>
    </CodeWrapper>
  );
};

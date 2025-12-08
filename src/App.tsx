import { CodeViewer } from "components/common/code-viewer/code.viewer";
import Layout from "components/layout/layout";
import { ThemeProvider } from "components/providers/theme-provider/theme.provider";
import "styles/index.css";

function App() {
  const codeExample = `import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log(\`Count changed to: \${count}\`);
  }, [count]);
  
  return (
    <div className="counter">
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;`;

  return (
    <ThemeProvider>
      <Layout>
        <CodeViewer code={codeExample} title="Counter.jsx" language="tsx" />
      </Layout>
    </ThemeProvider>
  );
}

export default App;

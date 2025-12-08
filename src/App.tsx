import { CodeViewer } from "components/common/code-viewer/code.viewer";
import Layout from "components/layout/layout";
import { ThemeProvider } from "components/providers/theme-provider/theme.provider";
import { ReactSwiper } from "components/ui/swiper/swiper";
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

  const slides = [
    {
      id: 1,
      title: "Первый слайд",
      description: "Описание первого слайда",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920",
    },
    {
      id: 2,
      title: "Второй слайд",
      description: "Описание второго слайда",
      image:
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920",
    },
    {
      id: 3,
      title: "Третий слайд",
      description: "Описание третьего слайда",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920",
    },
  ];

  return (
    <ThemeProvider>
      <Layout>
        <ReactSwiper>
          <CodeViewer code={codeExample} title="Counter.jsx" language="tsx" />
          <CodeViewer code={codeExample} title="Counter.jsx" language="tsx" />
          <CodeViewer code={codeExample} title="Counter.jsx" language="tsx" />
        </ReactSwiper>
      </Layout>
    </ThemeProvider>
  );
}

export default App;

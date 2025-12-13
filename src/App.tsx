import Layout from "components/layout/layout";
import { AlgorithmPlayground } from "components/module/playground-algorithm/algorithm.playground";
import { ThemeProvider } from "components/providers/theme-provider/theme.provider";
import { ReactSwiper } from "components/ui/swiper/swiper";
import { algorithmList } from "data/alogorithms/algorithms";
import "styles/index.css";

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <ReactSwiper>
          {algorithmList.map((item) => (
            <AlgorithmPlayground {...item} />
          ))}
        </ReactSwiper>
      </Layout>
    </ThemeProvider>
  );
}

export default App;

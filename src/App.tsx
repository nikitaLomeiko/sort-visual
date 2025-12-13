import Layout from "components/layout/layout";
import { AlgorithmPlayground } from "components/module/playground-algorithm/algorithm.playground";
import { SwipeHintProvider } from "components/providers/swiper-hint/swiper.hint.provider";
import { ThemeProvider } from "components/providers/theme-provider/theme.provider";
import { ReactSwiper } from "components/ui/swiper/swiper";
import { algorithmList } from "data/alogorithms/algorithms";
import "styles/index.css";

function App() {
  return (
    <SwipeHintProvider
      displayTime={5000}
      delay={1000}
      showOnlyOnce={true}
      mobileBreakpoint={768}
    >
      <ThemeProvider>
        <Layout>
          <ReactSwiper>
            {algorithmList.map((item) => (
              <AlgorithmPlayground {...item} />
            ))}
          </ReactSwiper>
        </Layout>
      </ThemeProvider>
    </SwipeHintProvider>
  );
}

export default App;

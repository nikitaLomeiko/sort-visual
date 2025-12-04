import Layout from "components/layout/layout";
import { useThemeManagment } from "hooks/theme/use.theme.managment";
import { useLayoutEffect } from "react";
import "styles/index.css";

function App() {
  const { getSavedTheme, applyTheme } = useThemeManagment();

  useLayoutEffect(() => {
    applyTheme(getSavedTheme());
  });

  return <Layout>app</Layout>;
}

export default App;

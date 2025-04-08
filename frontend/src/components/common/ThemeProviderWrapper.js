// src/components/ThemeProviderWrapper.jsx
import { ConfigProvider, theme as antdTheme } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadGoogleFont } from "../../utils/loadGoogleFont";

const ThemeProviderWrapper = ({ children }) => {


  const [fadeClass, setFadeClass] = useState("fade-theme show");

  const { themeMode, primaryColor, fontSize, fontFamily, borderRadius } = useSelector(
    (state) => state.theme
  );

  // load du lieu lan dau mo 
  useEffect(() => {
    if(fontFamily) {
      loadGoogleFont(fontFamily);
    }
  }, [fontFamily])

  const config = {
    token: {
      colorPrimary: primaryColor,
      fontSize,
      fontFamily,
      borderRadius,
    },
    algorithm: themeMode === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  };

  useEffect(() => {
    setFadeClass("fade-theme");
    const timeout = setTimeout(() => setFadeClass("fade-theme show"), 10);
    return () => clearTimeout(timeout);
  }, [themeMode]);

  return <ConfigProvider theme={config}>{children}</ConfigProvider>;
};

export default ThemeProviderWrapper;

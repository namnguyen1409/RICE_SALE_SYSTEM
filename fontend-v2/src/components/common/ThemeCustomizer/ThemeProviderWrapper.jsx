// src/components/ThemeProviderWrapper.jsx
import { ConfigProvider, theme as antdTheme } from "antd";
import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { loadGoogleFont } from "../../../utils/loadGoogleFont";

const ThemeProviderWrapper = ({ children }) => {
  const themeState = useSelector((state) => state.theme);
  const loadedFonts = new Set();

  const filteredToken = useMemo(() => {
    return Object.fromEntries(
      Object.entries(themeState).filter(([_, v]) => v !== undefined && v !== null)
    );
  }, [themeState]);

  const algorithms = useMemo(() => {
    const algos = [];
    if (themeState.themeMode === "dark") {
      algos.push(antdTheme.darkAlgorithm);
    } else {
      algos.push(antdTheme.defaultAlgorithm);
    }
    if (!themeState.sizeMode) {
      algos.push(antdTheme.compactAlgorithm);
    }
    return algos;
  }, [themeState.themeMode, themeState.sizeMode]);

  const config = useMemo(() => ({
    token: filteredToken,
    algorithm: algorithms,
  }), [filteredToken, algorithms]);

  useEffect(() => {
    if (themeState.fontFamily && !loadedFonts.has(themeState.fontFamily)) {
      loadGoogleFont(themeState.fontFamily);
      loadedFonts.add(themeState.fontFamily);
    }
  }, [themeState.fontFamily]);

  return <ConfigProvider theme={config}>{children}</ConfigProvider>;
};

export default React.memo(ThemeProviderWrapper);

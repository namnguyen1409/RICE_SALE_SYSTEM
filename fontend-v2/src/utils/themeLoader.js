// src/utils/themeLoader.js
export const loadSavedTheme = () => {
    try {
      const theme = localStorage.getItem("theme");
      return theme ? JSON.parse(theme) : {};
    } catch (e) {
      console.error("Failed to load theme:", e);
      return {};
    }
  };
  
// src/middleware/themeMiddleware.js
export const themeMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type.startsWith("theme/")) {
    const state = store.getState().theme;
    localStorage.setItem("theme", JSON.stringify(state));
  }

  return result;
};

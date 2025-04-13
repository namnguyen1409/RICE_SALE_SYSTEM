// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Dùng glob để import tất cả translation.json trong thư mục locales
const translationFiles = import.meta.glob("./locales/**/translation.json", { eager: true });

const resources = {};
const availableLanguages = [];

for (const path in translationFiles) {
  const translation = translationFiles[path];
  const langFolder = path.split("/")[2]; // ./locales/en/translation.json -> en

  resources[langFolder] = {
    translation: translation.default || translation,
  };

  availableLanguages.push({
    code: translation.default?.code || langFolder,
    label: translation.default?.name || langFolder.toUpperCase(),
    flag: translation.default?.flag || "🏳️",
    folder: langFolder,
  });
}

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("app-language") || "enus",
  fallbackLng: "enus",
  interpolation: {
    escapeValue: false,
  },
  keySeparator: false,
});

export default i18n;
export { availableLanguages };

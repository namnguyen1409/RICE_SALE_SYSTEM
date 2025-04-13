import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const context = require.context("./locales", true, /translation\.json$/);

const resources = {};
const availableLanguages = [];

context.keys().forEach((key) => {
  const langFolder = key.split("/")[1];
  const translation = context(key);

  resources[langFolder] = {
    translation,
  };

  availableLanguages.push({
    code: translation.code || langFolder,
    label: translation.name || langFolder.toUpperCase(),
    flag: translation.flag || "🏳️",
    folder: langFolder,
  });
});

console.log(resources);
console.log(availableLanguages);

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

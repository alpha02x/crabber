import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

let localeModules = import.meta.glob<true, string, Resource>(
  "../locales/*.json",
  {
    eager: true,
  }
);

let resources: Record<string, Resource> = {};
for (let path in localeModules) {
  let filenameWithNoExt = path.split("/").at(-1)!.replace(".json", "");
  resources[filenameWithNoExt] = localeModules[path];
}

export const SupportedLanguages: string[] = Object.keys(
  resources
) as (keyof typeof resources)[];

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: resources,
    debug: process.env!.NODE_ENV === "development",
    fallbackLng: "en",
    supportedLngs: SupportedLanguages,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "lang",
    },
  });

export default i18n;

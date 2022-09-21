import Backend from "i18next-fs-backend";
import { RemixI18Next } from "remix-i18next";
import { fallbackLanguage, supportedLanguages } from "./i18n-config";
import path from "path";

export const fileLoadPath = path.resolve(
  path.join(__dirname, "..", "public", "locales", "{{lng}}", "{{ns}}.json")
);
class SubdomainRemixI18Next extends RemixI18Next {
  public async getLocale(request: Request): Promise<string> {
    const hostHeader = request.headers.get("host");
    const subdomain = hostHeader?.split(".", 1)?.[0];
    const supportedLang =
      subdomain &&
      supportedLanguages.find(({ code }) => {
        const locale = new Intl.Locale(code);
        return locale.language === subdomain || code == subdomain;
      })?.code;
    return supportedLang || super.getLocale(request);
  }
}

export const i18n = new SubdomainRemixI18Next({
  detection: {
    fallbackLanguage,
    supportedLanguages: supportedLanguages.slice().map((lang) => lang.code),
  },
  i18next: {
    backend: {
      loadPath: fileLoadPath,
    },
  },
  backend: Backend,
});

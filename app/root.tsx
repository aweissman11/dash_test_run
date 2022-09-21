// Remix
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
// Styles
import tailwindStylesheetUrl from "~/tailwind/tailwind.css";
import fontsStyleSheetUrl from "../styles/fonts.css";
// Providers & Hooks
import { getUser } from "./session.server";
import { i18n } from "~/i18n.server";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next";
import { getEnv } from "~/config";
import { supportedLanguages } from "./i18n-config";
import { ShopifyProvider } from "~/shopify/components/ShopifyProvider";
// Components
import { Nav } from "~/contentful/components/Nav";
import { MiniCart } from "~/shopify/components/MiniCart";
import { MiniCartActivator } from "./shopify/components/MiniCartActivator";
import { GoogleAnalytics } from "~/components/GoogleAnalytics";
import { Footer } from "~/components/Footer";
import { getNavContainer } from "~/contentful/index.server";
import { INavContainer, SpecificLocale } from "~/@types/generated/contentful";
import { NavProvider } from "~/contentful/components/NavProvider";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: fontsStyleSheetUrl },
  ];
};

export const meta: MetaFunction = () => {
  /**
   * This is the root meta tag for the project, and is applied to every page.
   * You'll probably want to customize this for your project.
   * See: https://ogp.me/
   */
  const description =
    "DEPT DASH™ is an opinionated framework for building web applications.";

  return {
    charset: "utf-8",
    title: "DEPT DASH™",
    keywords: "DEPT,blog,store,agency",
    "twitter:creator": "@deptagency",
    "twitter:site": "@deptagency",
    "twitter:title": "DEPT DASH™",
    "twitter:description": description,
    viewport: "width=device-width,initial-scale=1",
  };
};

type LoaderData = {
  GLOBALS: string;
  GA_TRACKING_ID: string | null;
  PUBLICLY_AVAILABLE_ORIGIN: string;
  locale: string;
  user: Awaited<ReturnType<typeof getUser>>;
  primaryNav: SpecificLocale<INavContainer>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const locale = await i18n.getLocale(request);
  const primaryNav = await getNavContainer("primary", {
    locale,
    preview: new URL(request.url).searchParams.get("preview") === "1",
  });
  return json<LoaderData>({
    user: await getUser(request),
    GA_TRACKING_ID: getEnv("GA_TRACKING_ID", { default: null }),
    PUBLICLY_AVAILABLE_ORIGIN: getEnv("PUBLICLY_AVAILABLE_ORIGIN"),
    locale,
    GLOBALS: JSON.stringify({
      SENTRY_DSN: getEnv("SENTRY_DSN", { default: null }),
    }),
    primaryNav,
  });
};
function useGoogleAnalytics() {
  const { GA_TRACKING_ID } = useLoaderData<LoaderData>();
  if (!GA_TRACKING_ID?.length) return null;
  return GA_TRACKING_ID;
}
/**
 * Construct <link rel="alternate"> tags to inform search engines and browsers
 * about locale variants of the page, as described at https://developers.google.com/search/docs/advanced/crawling/localized-versions#html
 */
function useAlternateLinks() {
  const { locale, PUBLICLY_AVAILABLE_ORIGIN } = useLoaderData<LoaderData>();
  const { pathname, search } = useLocation();
  if (!PUBLICLY_AVAILABLE_ORIGIN) return [];
  const links = supportedLanguages
    .filter((lang) => lang.code !== locale) // skip current locale
    .map((lang) => (
      <link
        key={lang.code}
        rel="alternate"
        hrefLang={lang.code}
        href={`https://${
          new Intl.Locale(lang.code).language
        }.${PUBLICLY_AVAILABLE_ORIGIN}${pathname}${search}`}
      />
    ));
  links.push(
    <link
      key="x-default"
      rel="alternate"
      hrefLang="x-default"
      href={`https://${PUBLICLY_AVAILABLE_ORIGIN}${pathname}${search}`}
    />
  );
  return links;
}

export const handle = {
  // In the handle export, we could add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  i18n: [],
};

export default function App() {
  let { locale, GLOBALS } = useLoaderData<LoaderData>();
  let { primaryNav } = useLoaderData<LoaderData>();
  let { i18n } = useTranslation();

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);

  const alternateLinks = useAlternateLinks();
  const gaTrackingId = useGoogleAnalytics();

  return (
    <html lang={locale} className="h-full" dir={i18n.dir()}>
      <head>
        <Meta />
        <Links />
        {alternateLinks}
        {gaTrackingId && <GoogleAnalytics gaTrackingId={gaTrackingId} />}
      </head>
      <NavProvider navContainers={{ primaryNav }}>
        <body className="h-full">
          <ShopifyProvider>
            <Nav
              sticky={true}
              slot={<MiniCartActivator className="ml-4" />}
              children={<MiniCart />}
              // TODO: pull this from contentful
              banner={<div>Here is a ticket banner for important messages</div>}
            />
            <main id="main-content">
              <Outlet />
            </main>
          </ShopifyProvider>

          <Footer />

          <ScrollRestoration />
          <script
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: `window.GLOBALS=${GLOBALS}` }}
          />
          <Scripts />
          <LiveReload />
        </body>
      </NavProvider>
    </html>
  );
}

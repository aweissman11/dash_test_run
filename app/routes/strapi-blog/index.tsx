import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/server-runtime";
import { useTranslation } from "react-i18next";
import { Grid } from "~/components/Grid";
import { Hero } from "~/components/Hero";
import { Inset } from "~/components/Inset";
import { getEnv } from "~/config";

import { ArticleCard } from "~/strapi/components/ArticleCard";
import { getArticles } from "~/strapi/index.server";

export const meta: MetaFunction = () => {
  return {
    title: "Strapi Blog",
    description: "Our Strapi blog",
  };
};

export interface LoaderData {
  STRAPI_URL: string;
  articles: any[];
}

const i18nNamespaces = ["common", "tags"];

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const articles = await getArticles();

  return {
    STRAPI_URL: getEnv("STRAPI_URL"),
    articles,
  };
};

export const handle = {
  i18n: i18nNamespaces,
};

export default function Strapi() {
  const { articles, STRAPI_URL } = useLoaderData<LoaderData>();
  const { t } = useTranslation(i18nNamespaces);

  return (
    <section className="relative">
      <Hero
        background={{
          imageProps: {
            src: "heroBackground.webp",
            alt: "Abstract orange background",
          },
        }}
        size="small"
        title={t("Blog")}
      />
      <Inset padded>
        <Grid cols={3}>
          {articles?.length ? (
            articles.map((article) => (
              <ArticleCard
                STRAPI_URL={STRAPI_URL}
                article={article}
                key={article.id}
              />
            ))
          ) : (
            <>
              <p>No articles found!</p>
            </>
          )}
        </Grid>
      </Inset>
    </section>
  );
}

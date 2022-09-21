import invariant from "tiny-invariant";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";
import { getArticleBySlug } from "~/strapi/index.server";
import { Article } from "~/strapi/types";
import { RenderMarkdown } from "~/strapi/components/Markdown";
import { Hero } from "~/components/Hero";

interface LoaderData {
  article: Article;
}

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  invariant(params.slug, "expected params.slug");
  const article = await getArticleBySlug(params.slug);

  return { article };
};

export default function Store() {
  const { article } = useLoaderData<LoaderData>();

  const toDate = (date: string): string => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <>
      {
        <div>
          {article && (
            <Hero
              background={{
                imageProps: {
                  src: "/heroBackground.webp",
                },
              }}
              size="medium"
              title={article.attributes.title}
            />
          )}
          <div className="my-24 mx-4 md:mx-auto md:w-3/4">
            {article ? (
              <>
                <p className="mb-4">{toDate(article.attributes.updatedAt)}</p>
                <RenderMarkdown>{article.attributes.content}</RenderMarkdown>
              </>
            ) : (
              <div>No article found with that name!</div>
            )}
          </div>
        </div>
      }
    </>
  );
}

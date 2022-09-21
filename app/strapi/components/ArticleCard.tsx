import { Link } from "@remix-run/react";
import { Article } from "~/strapi/types";

export type CardProps = {
  STRAPI_URL: string;
  article: Article;
};

export const ArticleCard = ({ STRAPI_URL, article }: CardProps) => {
  const image = article.attributes.image.data
    ? article.attributes.image.data.attributes.formats.medium
    : null;
  const alternativeText = article.attributes.image.data
    ? article.attributes.image.data.attributes.alternativeText
    : null;

  return (
    <Link to={`/strapi-blog/${article.attributes.slug}`}>
      <div className="hover:opacity-60">
        {image && alternativeText && (
          <div>
            <img
              src={`${STRAPI_URL}${image.url}`}
              alt={alternativeText}
              className="max-h-72 w-full object-cover"
            />
          </div>
        )}
        <div className="mt-3">
          <h2>{article.attributes.title}</h2>
        </div>
      </div>
    </Link>
  );
};

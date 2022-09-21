/**
 * TODO: when Strapi adds typescript support,
 * we'll be able to import generated strapi types and these
 * types won't need to be manually maintained anymore.
 */

export interface Article {
  id: string;
  attributes: {
    title: string;
    content: string;
    slug: string;
    image: {
      data?: {
        attributes: {
          alternativeText: string;
          caption: string;
          formats: {
            large: ArticleImage;
            medium: ArticleImage;
            small: ArticleImage;
            thumbnail: ArticleImage;
          };
        };
      };
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

interface ArticleImage {
  height: number;
  width: number;
  url: string;
  mime: string;
}

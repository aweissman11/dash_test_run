import { getEnv } from "~/config";
import { Article } from "./types";

/**
 * This file contains the api requests to the strapi server (which should
 * be running alongside the remix server)
 * If you add new content types or make changes to strapi, you'll also
 * want to add more routes and requests here to hydrate the data
 */

const STRAPI_URL = getEnv("STRAPI_URL");
const STRAPI_API_TOKEN = getEnv("STRAPI_API_TOKEN");

const headers = {
  Authorization: `bearer ${STRAPI_API_TOKEN}`,
};

export async function getArticles(): Promise<Article[]> {
  const res = await fetch(`${STRAPI_URL}/api/articles?populate=*`, {
    headers,
  }).then((res) => res.json());
  return res.data;
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  const res = await fetch(
    `${STRAPI_URL}/api/articles/?filters[slug][$eq]=${slug}&populate=*`,
    {
      headers,
    }
  ).then((res) => res.json());
  return res.data?.length ? res.data[0] : null;
}

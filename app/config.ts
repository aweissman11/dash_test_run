// Configuration variables that are public and remain the same between environments are stored here
// all other configuration variables are environment variables in /.envrc (or look at /.envrc.example initially)
export const CONTENTFUL_ACCESS_TOKEN =
  "366z1t9rZSesLtrvAEH0UGwJHNDf3GOlIMhzhq4RS1E";
export const ALGOLIA_APP_ID = "RHVCHJW67L";
export const ALGOLIA_INDEX = "demo_content";
export const ALGOLIA_SEARCH_KEY = "5e56001b6c4b76edb3d2b69ca5951b75";
export const ALGOLIA_STORE_INDEX =
  "shopify_products_recently_ordered_count_desc";
export const SHOPIFY_STORE = "deptdash";
export const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  "94a0b1fcf16a93692150e69806d9786a";
export const SHOPIFY_STOREFRONT_API_VERSION = "2022-07";
export const GLOBAL_CACHE_SECONDS = 10;

export function getEnv(property: string): string;
export function getEnv<T>(
  property: string,
  options: { default: T }
): string | T;
export function getEnv(
  property: string,
  options?: { default: string | null }
): string | null {
  const value = process.env[property];
  if (!value && options) return options.default;
  if (!value)
    throw new Error(
      `no environment variable found for "${property}" and no default provided`
    );
  return value;
}

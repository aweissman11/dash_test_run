import type {
  Maybe,
  Image,
} from "@shopify/hydrogen/dist/esnext/storefront-api-types";

export interface ShopifyImageProps {
  image: Image;
  productTitle: string;
  wrapperClassName?: string;
  assetClassName?: string;
  imageSizes?: Array<string>;
}

export function ShopifyImage({
  image,
  productTitle,
  wrapperClassName,
  assetClassName,
  imageSizes,
}: ShopifyImageProps) {
  const imagesSizeQueries = imageSizes?.join(", ");

  return (
    <div className={wrapperClassName}>
      <picture>
        <source
          className={assetClassName}
          type="image/webp"
          srcSet={getSrcSet({
            width: image.width,
            url: image.url,
          })}
          sizes={imagesSizeQueries}
        />
        <img
          className={assetClassName}
          srcSet={getSrcSet({
            width: image.width,
            url: image.url,
          })}
          sizes={imagesSizeQueries}
          alt={productTitle}
        />
      </picture>
    </div>
  );
}

function getSrcSet({
  width,
  url,
  increment = 500,
}: {
  width: Maybe<number> | undefined;
  url: string;
  increment?: number;
}) {
  // Generate a srcset entry at each increment
  let srcSetItems = [];
  for (let i = 1; i < (width || 300) / increment; i++) {
    // Calculate width for this iteration (for example: 500, 1000, 1500, etc.)
    const width = i * increment;
    srcSetItems.push(`${url}?w=${width}&q=80&fm=webp ${width}w`);
  }
  return srcSetItems.join(",");
}

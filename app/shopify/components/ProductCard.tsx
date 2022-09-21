import { Button } from "~/components/Button";
import { Pill } from "~/components/Pill";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "@remix-run/react";
import type { Collection } from "@shopify/hydrogen/dist/esnext/storefront-api-types";

export type ProductCardProps = {
  // Algolia may return a different model
  // TODO: fix this type
  product: Collection | any;
};

export function ProductCard({ product }: ProductCardProps) {
  let { handle, title, vendor, price, compareAtPrice, variants, image } =
    product;

  price = variants?.nodes?.length ? variants.nodes[0].priceV2.amount : price;
  compareAtPrice = variants?.nodes?.length
    ? variants.nodes[0].compareAtPriceV2?.amount
    : compareAtPrice;

  return (
    <Link to={handle} prefetch="intent">
      <article className="group relative flex cursor-pointer flex-col items-center justify-center p-4 outline outline-1 outline-border hover:outline-2 hover:outline-black">
        <div className="relative w-full">
          <LazyLoadImage
            className="object-cover"
            src={
              variants?.nodes?.length ? variants.nodes[0]?.image?.url : image
            }
            alt={title}
            height="500px"
            width="500px"
          />
          <span className="absolute bottom-3 left-2">
            <Pill variant="badge">New</Pill>
          </span>
        </div>
        <div className="mt-4 flex w-full flex-col justify-start">
          {vendor && <h5 className="text-md">{vendor}</h5>}
          <h2 className="text-lg font-bold">{title}</h2>
          <hr className="my-4" />
          <div className="price mb-4 flex flex-col items-end justify-center">
            <span className="text-xl font-bold">${price}</span>
            {compareAtPrice && (
              <div className="text-md text-grey-dark line-through">
                ${compareAtPrice}
              </div>
            )}
          </div>
        </div>
        {/* TODO: update to show on hover */}
        <div className="flex hidden w-full flex-row gap-2 transition-all">
          <Button
            variant="secondary"
            className="w-1/2 bg-grey-light-3 text-black hover:bg-grey-dark-2"
          >
            Buy Now
          </Button>
          <Button variant="primary" className="w-1/2">
            Add to Cart
          </Button>
        </div>
      </article>
    </Link>
  );
}

export type ProductTitleProps = {
  name: string;
  brand?: string;
  variant: "sm" | "lg";
  className?: string;
};

export function ProductTitle({
  name,
  brand,
  variant,
  className,
}: ProductTitleProps) {
  switch (variant) {
    case "sm":
      return (
        <div className={className}>
          {brand && <h5 className="text-product-subtitle">{brand}</h5>}
          <h4 className="text-product-title-sm font-bold text-black">{name}</h4>
        </div>
      );
    case "lg":
      return (
        <div className={className}>
          {brand && <h3 className="text-product-subtitle">{brand}</h3>}
          <h2 className="text-product-title-lg font-bold text-black">{name}</h2>
        </div>
      );
  }
}

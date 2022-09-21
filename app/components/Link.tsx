import { Link as RemixLink } from "@remix-run/react";

export type LinkProps = {
  variant?: "primary" | "dark";
  unstyled?: boolean;
  underlined?: boolean;
  children: string | React.ReactNode;
  to?: string;
  href?: string;
  rel?: string;
  target?: string;
  as?: React.ElementType;
  onClick?: () => void;
  className?: string;
};

export const Link = ({
  variant = "primary",
  unstyled = false,
  children,
  underlined,
  to,
  href,
  rel,
  target = "_blank",
  onClick,
  as: Component = "a",
  className = "",
}: LinkProps) => {
  const baseStyling = `inline-block whitespace-nowrap text-sm`;
  const underlinedStyling = underlined ? "underline" : "";

  const variantStyling = () => {
    switch (variant) {
      case "primary":
        return "text-primary hover:text-primary-targeted";
      case "dark":
        return "text-black hover:opacity-75";
      default:
        return "";
    }
  };

  if (to) {
    return (
      <RemixLink
        to={to}
        rel={rel}
        onClick={onClick}
        className={`${!unstyled && baseStyling && underlinedStyling} ${
          !unstyled && variantStyling()
        } ${className}`}
      >
        {children}
      </RemixLink>
    );
  }

  return (
    <Component
      href={href}
      rel={rel}
      target={target}
      onClick={onClick}
      className={`${!unstyled && baseStyling && underlinedStyling} ${
        !unstyled && variantStyling()
      } ${className}`}
    >
      {children}
    </Component>
  );
};

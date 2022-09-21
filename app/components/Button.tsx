import { Link } from "@remix-run/react";

/**
 * A styled button component.
 */
export type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary" | "white";
  block?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children?: string;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  as?: React.ElementType;
  ariaLabel?: string;
  rounded?: boolean;
};

export const Button = ({
  variant = "primary",
  block,
  icon,
  iconPosition = "left",
  ariaLabel,
  rounded,
  disabled,
  className = "",
  children,
  to,
  href,
  onClick,
  type,
  as: Component = "button",
}: ButtonProps) => {
  const baseStyling = `inline-block text-center py-4 px-8 whitespace-nowrap rounded-button ${
    block ? "w-full" : ""
  } ${rounded ? "rounded-full" : ""}`;

  const IconBaseStyling = `flex items-center justify-center ${
    rounded ? "rounded-full" : ""
  }`;

  const variantStyling = () => {
    switch (variant) {
      case "primary":
        return "bg-primary hover:bg-primary-targeted active:bg-primary-targeted focus:ring focus:ring-primary-targeted focus:bg-primary-targeted text-white";
      case "secondary":
        return "bg-white hover:bg-primary-hover active:bg-primary-hover focus:bg-primary-hover text-primary outline outline-1 outline-primary";
      case "tertiary":
        return "bg-transparent hover:bg-primary-hover active:bg-primary-hover focus:bg-primary-hover text-primary";
      case "white":
        return "bg-white hover:bg-gray-100 text-black";
    }
  };

  if (icon) {
    return to ? (
      <Link to={to}>
        <Component
          className={`${IconBaseStyling} ${variantStyling()} ${className}`}
          disabled={disabled}
          onClick={onClick}
          type={type}
          aria-label={ariaLabel || "Button Icon"}
        >
          {iconPosition === "left" && icon}
          {children && (
            <span className={iconPosition === "left" ? "mr-6" : "ml-6"}>
              {children}
            </span>
          )}
          {iconPosition === "right" && icon}
        </Component>
      </Link>
    ) : (
      <Component
        className={`${IconBaseStyling} ${variantStyling()} ${className}`}
        disabled={disabled}
        href={href}
        target={href ? "_blank" : undefined}
        onClick={onClick}
        type={type}
        aria-label={ariaLabel || "Button Icon"}
      >
        {iconPosition === "left" && icon}
        {children && (
          <span className={iconPosition === "left" ? "mr-6" : "ml-6"}>
            {children}
          </span>
        )}
        {iconPosition === "right" && icon}
      </Component>
    );
  }

  return to ? (
    // Remix link component for routing
    <Link
      to={to}
      className={`${baseStyling} ${variantStyling()} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      } {${className}`}
      onClick={onClick}
      type={type}
      aria-label={children}
    >
      {children}
    </Link>
  ) : (
    <Component
      className={`${baseStyling} ${variantStyling()} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      } ${className}`}
      onClick={onClick}
      href={href}
      type={type}
      target={href ? "_blank" : undefined}
      aria-label={children}
    >
      {children}
    </Component>
  );
};

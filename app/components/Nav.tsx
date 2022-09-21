import { Button } from "./Button";
import { AlertBanner } from "./AlertBanner";
import logoImage from "./stories/assets/logo.svg";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { Popover } from "@headlessui/react";
import { NavLink } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export type NavProps = {
  sticky?: boolean;
  banner?: React.ReactNode; // slot at the top of the navbar.
  slot?: React.ReactNode; //
  children?: React.ReactNode; // slot at the bottom of the nav bar
};

export function Nav({ sticky = false, banner, slot, children }: NavProps) {
  const { t } = useTranslation("common");

  const links = [
    { name: t("Home"), href: "/" },
    { name: t("About Us"), href: "/about-us" },
    { name: "Contentful", href: "/contentful" },
    { name: "Strapi", href: "/strapi-blog" },
    { name: t("Store"), href: "/store" },
    { name: t("Search"), href: "/search" },
  ];

  return (
    <Popover
      as="nav"
      id="nav-header"
      className={`${sticky ? "sticky top-0 z-50" : ""}`}
    >
      {banner && <AlertBanner content={banner} />}
      <div className="border-1 flex h-[80px] items-center justify-between border border-border-weak bg-white p-2 px-10">
        <div className="leading-[64px]">
          <NavLink to="/">
            <img
              src={logoImage}
              alt="Logo"
              className="inline-block w-[120px]"
              width="120px"
              height="33px"
            />
          </NavLink>
        </div>
        <div className="flex items-center">
          <a href="#main-content" className="sr-only focus:not-sr-only">
            Skip Navigation
          </a>
          <span className="mr-10 hidden lg:inline">
            {links.map(({ name, href }) => (
              <NavLink
                key={name}
                to={href}
                className={({ isActive }) =>
                  `px-5 text-text hover:text-text-weak ${
                    isActive ? "font-bold" : ""
                  }`
                }
              >
                {name}
              </NavLink>
            ))}
          </span>
          <Button
            to="/contact-us"
            className="hidden lg:inline-block"
            aria-label="Contact"
          >
            Contact Us
          </Button>
          <div className="ml-10">{slot}</div>
          <Popover.Button
            className="flex w-10 cursor-pointer items-center align-top lg:hidden"
            aria-label="Open navigation menu"
          >
            <MenuIcon />
          </Popover.Button>
        </div>
      </div>

      {children}

      <Popover.Overlay className="fixed inset-0 bg-black opacity-40" />

      <Popover.Panel className="absolute top-0 right-14 left-0 z-10 h-screen bg-white">
        <Popover.Button
          className="float-right m-2 w-10 cursor-pointer"
          aria-label="Close navigation menu"
        >
          <XIcon />
        </Popover.Button>
        {links.map((link) => (
          <Popover.Button
            key={link.name}
            as={NavLink}
            to={link.href}
            className="m-5 block"
          >
            {link.name}
          </Popover.Button>
        ))}
        <Popover.Button
          as={NavLink}
          to="/contact-us"
          className="m-10 block sm:hidden"
        >
          Contact Us
        </Popover.Button>
      </Popover.Panel>
    </Popover>
  );
}

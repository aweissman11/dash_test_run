import type { ComponentMeta } from "@storybook/react";
import { ProductTitle } from "~/shopify/components/ProductTitle";
import { makeTemplate } from "./utils";

export default {
  title: "E-Commerce/Product Title",
  component: ProductTitle,
} as ComponentMeta<typeof ProductTitle>;

export const Small = makeTemplate(ProductTitle);

Small.args = {
  name: "Product Title",
  brand: "Brand",
  variant: "sm",
};

export const Large = makeTemplate(ProductTitle);

Large.args = {
  name: "Product Title",
  brand: "Brand",
  variant: "lg",
};

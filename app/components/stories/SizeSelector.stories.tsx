import type { ComponentMeta } from "@storybook/react";
import { SizeSelector } from "~/shopify/components/SizeSelector";
import { makeTemplate } from "./utils";

export default {
  title: "E-Commerce/Size Selector",
  component: SizeSelector,
} as ComponentMeta<typeof SizeSelector>;

export const Basic = makeTemplate(SizeSelector);

Basic.args = {
  options: [
    { name: "Small", size: "S" },
    { name: "Medium", size: "M" },
    { name: "Large", size: "L" },
    { name: "Extra Large", size: "XL" },
  ],
};

export const Disabled = makeTemplate(SizeSelector);

Disabled.args = {
  options: [
    { name: "Extra Small", size: "XS", disabled: true },
    { name: "Small", size: "S" },
    { name: "Medium", size: "M" },
    { name: "Large", size: "L" },
    { name: "Extra Large", size: "XL", disabled: true },
    { name: "Extra Extra Large", size: "XXL" },
  ],
};

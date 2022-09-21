import type { ComponentMeta } from "@storybook/react";
import { Filters } from "../Filters";
import { makeTemplate } from "./utils";

export default {
  title: "E-Commerce/Filters",
  component: Filters,
} as ComponentMeta<typeof Filters>;

export const Basic = makeTemplate(Filters);

import type { ComponentMeta } from "@storybook/react";
import type { SpecificLocale, Asset } from "~/@types/generated/contentful";
import { ArticleCard } from "../../../contentful/components/ArticleCard";
import { makeTemplate } from "../utils";
import { sampleImage } from "../assets/contentful";

export default {
  title: "DEPT DASH™/Contentful/Article Card",
  component: ArticleCard,
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ArticleCard>;

export const Basic = makeTemplate(ArticleCard);
Basic.args = {
  asset: sampleImage as unknown as SpecificLocale<Asset>,
  category: { label: "Blog", to: "/" },
  date: "Dec 2022",
  title:
    "The main component title would sit here and can span across as many lines as you wish.",
  buttonTo: "/",
};

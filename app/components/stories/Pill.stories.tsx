import type { ComponentMeta } from "@storybook/react";
import { Pill } from "../Pill";
import { makeTemplate } from "./utils";

export default {
  title: "DEPT DASH™/Pill",
  component: Pill,
} as ComponentMeta<typeof Pill>;

export const Basic = makeTemplate(Pill);

Basic.args = {
  children: "Lorem Ipsum",
  variant: "primary",
  selected: true,
};

export const RowOfPills = () => (
  <>
    <div className="space-around flex flex-row">
      <Pill
        children="Category 1"
        variant="primary"
        selected={true}
        className="mx-2"
      />
      {[1, 2, 3, 4].map((n, i) => (
        <Pill
          key="i"
          children={`Category ${i + 2}`}
          variant="primary"
          selected={false}
          className="mx-2"
        />
      ))}
    </div>
  </>
);

export const Badge = () => (
  <>
    <p className="mb-6">
      You can use this pill as a badge with the "badge" variant.
    </p>
    <Pill children="New" variant="badge" />
  </>
);

import { useEffect } from "react";
import type { ComponentMeta } from "@storybook/react";
import { makeTemplate, getFigmaUrl } from "./utils";

type TextSizesProps = {
  baseFontSizePx: number;
  baseLineHeightPx: number;
  scaleRatio: number;
};

const TextSizes = ({
  baseFontSizePx,
  baseLineHeightPx,
  scaleRatio,
}: TextSizesProps) => {
  /**
   * Get the root element and change the font size and line height accordingly
   */
  const r: any = document.querySelector(":root");

  const setNewFontSize = (size: number) => {
    r.style.setProperty("--base-font-size", `${size}px`);
  };

  const setNewLineHeight = (value: number) => {
    r.style.setProperty("--base-line-height", `${value}px`);
  };

  const setNewRatio = (value: number) => {
    r.style.setProperty("--ratio", value);
  };

  useEffect(() => {
    setNewFontSize(baseFontSizePx);
    setNewLineHeight(baseLineHeightPx);
    setNewRatio(scaleRatio);
  });

  return (
    <div>
      <div className="text-4xl">Modular Scale Typography</div>
      <div className="mt-2 text-sm">
        Change your screen size and the base size controls to adjust the size
        and spacing of each text size. To reset, refresh the page.
      </div>
      <hr className="my-6" />

      <p className="text-grey-dark-2">display</p>
      <div className="display">Lorem Ipsum</div>

      <p className="mt-8 text-grey-dark-2">h1</p>
      <h1>Lorem Ipsum Dolor Sit Amet</h1>

      <p className="mt-8 text-grey-dark-2">h2</p>
      <h2>Lorem Ipsum Dolor Sit Amet</h2>

      <p className="mt-8 text-grey-dark-2">h3</p>
      <h3>Lorem Ipsum Dolor Sit Amet</h3>

      <p className="mt-8 text-grey-dark-2">h4</p>
      <h4>Lorem Ipsum Dolor Sit Amet</h4>

      <p className="mt-8 text-grey-dark-2">h5</p>
      <h5>Lorem Ipsum Dolor Sit Amet</h5>

      <p className="mt-8 text-grey-dark-2">display body</p>
      <div className="display-body">Lorem Ipsum</div>

      <p className="mt-8 text-grey-dark-2">body</p>
      <div className="body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla
        eros vitae sapien commodo venenatis. Proin consequat consequat massa.
        Cras dui leo, venenatis eu augue ut, luctus tincidunt nisi. Donec
        tincidunt leo lacus, ac ullamcorper nulla porttitor quis. In aliquet
        tincidunt lobortis.
      </div>

      <p className="mt-8 text-grey-dark-2">caption</p>
      <div className="caption">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla
        eros vitae sapien commodo venenatis. Proin consequat consequat massa.
        Cras dui leo, venenatis eu augue ut, luctus tincidunt nisi. Donec
        tincidunt leo lacus, ac ullamcorper nulla porttitor quis. In aliquet
        tincidunt lobortis.
      </div>
    </div>
  );
};

export default {
  title: "DEPT DASH™/Typography",
  component: TextSizes,
  parameters: {
    design: {
      type: "figma",
      url: getFigmaUrl("1603%3A13728"),
    },
  },
} as ComponentMeta<typeof TextSizes>;

const root: any = document.querySelector(":root");
const rs = getComputedStyle(root);

export const Typography = makeTemplate(TextSizes);

Typography.args = {
  baseFontSizePx: parseInt(
    rs.getPropertyValue("--base-font-size").replace("px", "")
  ),
  baseLineHeightPx: parseInt(
    rs.getPropertyValue("--base-line-height").replace("px", "")
  ),
  scaleRatio: parseFloat(rs.getPropertyValue("--ratio")),
};

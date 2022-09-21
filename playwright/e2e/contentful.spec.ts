/**
 * NOTE: This file is purged if you run the `remove-contentful` script.
 * If you change the name or location of the file,
 * you'll need to update the `remove-contentful` script or remove this manually.
 */
import { test, expect } from "@playwright/test";
import { LandingPage } from "../pages/landing.page";

let landingPage: LandingPage;

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page);
  await landingPage.goto();
});

test.describe("Contentful Content", () => {
  test("should render contentful content", async () => {
    await expect(landingPage.contentfulTitle).toContainText(
      "How do I edit this content?"
    );
  });
});

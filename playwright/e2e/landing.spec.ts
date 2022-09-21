import { test, expect } from "@playwright/test";
import { LandingPage } from "../pages/landing.page";

let landingPage: LandingPage;

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page);
  await landingPage.goto();
});

test.describe("Landing Page", () => {
  test("should render some basic elements", async () => {
    await expect(landingPage.header).toBeVisible();
    await expect(landingPage.mainContent).toBeVisible();
  });
});

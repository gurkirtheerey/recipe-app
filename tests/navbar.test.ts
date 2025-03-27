import { expect, test } from "@playwright/test";

const selectors = {
  loginLink: '[data-testid="login-link-navbar"]',
  signupLink: '[data-testid="signup-link-navbar"]',
  featuresLink: '[data-testid="features-link-navbar"]',
  pricingLink: '[data-testid="pricing-link-navbar"]',
  blogLink: '[data-testid="blog-link-navbar"]',
  aboutLink: '[data-testid="about-link-navbar"]',
} as const;

test("should navigate to the login page", async ({ page }) => {
  // Set a desktop viewport size
  await page.setViewportSize({ width: 1280, height: 720 });
  // Start from the index page
  await page.goto("/");
  // Find an element with the text 'Login' and click on it
  await page.click(selectors.loginLink);
  // The new URL should be "/login"
  await expect(page).toHaveURL("/login");
});

test("should navigate to the signup page", async ({ page }) => {
  // Set a desktop viewport size
  await page.setViewportSize({ width: 1280, height: 720 });
  // Start from the index page
  await page.goto("/");
  // Find an element with the text 'Sign Up' and click on it
  await page.click(selectors.signupLink);
  // The new URL should be "/signup"
  await expect(page).toHaveURL("/signup");
});

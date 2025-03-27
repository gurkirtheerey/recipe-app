import { test, expect } from "@playwright/test";

// Test utilities
const selectors = {
  signupForm: '[data-testid="signup-form"]',
  submitButton: '[data-testid="submit-button"]',
  errorMessage: '[data-testid="error-message"]',
  loginLink: '[data-testid="login-link"]',
} as const;

test("should navigate to the signup page", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("/signup");
  // The new URL should be "/signup" (baseURL is used there)
  await expect(page).toHaveURL("/signup");
  // Verify we're on the signup form
  await expect(page.locator(selectors.signupForm)).toBeVisible();
  // The new page should contain an h1 with "Signup"
  await expect(page.locator("h1")).toContainText("Create Account");

  // Submit the form
  await page.click(selectors.submitButton);

  // Check for error message
  await expect(page.locator(selectors.errorMessage)).toBeVisible();
  await expect(page.locator(selectors.errorMessage)).toContainText(
    "Anonymous sign-ins are disabled"
  );
});

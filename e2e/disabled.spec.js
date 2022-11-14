import { test, expect } from '@playwright/test'



test('should disable button after 5 clicks', async ({ page }) => {

    await page.goto('http://localhost:3000')
    await page.evaluate(() => window.localStorage.clear());
    const button = page.locator('button:has-text("Skip")')
    await button.click({clickCount: 5})

    await expect(button).toBeDisabled()
})
import { test } from '@playwright/test';

async function scrollAndReveal(page: import('@playwright/test').Page) {
  // Scroll slowly so IntersectionObserver fires and Framer Motion animations complete
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  const step = 300;
  let pos = 0;
  while (pos < totalHeight) {
    pos = Math.min(pos + step, totalHeight);
    await page.evaluate((y) => window.scrollTo(0, y), pos);
    await page.waitForTimeout(120);
  }
  // Let final animations settle, then scroll back to top
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
}

test('light theme full page', async ({ page }) => {
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('networkidle');
  await scrollAndReveal(page);
  await page.screenshot({ path: 'screenshots/light.png', fullPage: true });
});

test('dark theme full page', async ({ page }) => {
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('networkidle');
  await page.click('[data-testid="theme-toggle"]');
  await page.waitForTimeout(400);
  await scrollAndReveal(page);
  await page.screenshot({ path: 'screenshots/dark.png', fullPage: true });
});

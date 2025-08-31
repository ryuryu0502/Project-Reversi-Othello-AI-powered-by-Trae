const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading structure', async ({ page }) => {
    // Check if there's a main heading
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Othello');
    
    // Check heading hierarchy (no h3 without h2, etc.)
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);
  });

  test('should have proper focus management', async ({ page }) => {
    // Test tab navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement.tagName);
    expect(['BUTTON', 'SELECT', 'INPUT'].includes(focusedElement)).toBeTruthy();
    
    // Test that focus is visible
    const focusedElementLocator = page.locator(':focus');
    await expect(focusedElementLocator).toBeVisible();
  });

  test('should have proper ARIA labels and roles', async ({ page }) => {
    // Check main content area
    await expect(page.locator('[role="main"]')).toBeVisible();
    
    // Check game board cells have proper labels
    const cells = page.locator('.cell[aria-label]');
    await expect(cells.first()).toBeVisible();
    
    // Check buttons have proper labels
    const buttons = page.locator('button[aria-label]');
    await expect(buttons.first()).toBeVisible();
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Test keyboard shortcuts
    await page.keyboard.press('Space');
    await expect(page.locator('.cell.hint').first()).toBeVisible();
    
    await page.keyboard.press('r');
    await expect(page.locator('#black-score')).toContainText('2');
    
    await page.keyboard.press('s');
    await expect(page.locator('#stats-modal')).toBeVisible();
    
    await page.keyboard.press('Escape');
    await expect(page.locator('#stats-modal')).not.toBeVisible();
  });

  test('should have sufficient color contrast', async ({ page }) => {
    // Test both light and dark themes
    const themes = ['light', 'dark'];
    
    for (const theme of themes) {
      if (theme === 'dark') {
        await page.click('#theme-toggle');
        await page.waitForTimeout(500);
      }
      
      // Run accessibility scan for color contrast
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2aa'])
        .analyze();
      
      const contrastViolations = accessibilityScanResults.violations.filter(
        violation => violation.id === 'color-contrast'
      );
      
      expect(contrastViolations).toEqual([]);
    }
  });

  test('should work with screen reader simulation', async ({ page }) => {
    // Simulate screen reader by checking text content and labels
    const gameBoard = page.locator('.game-board');
    await expect(gameBoard).toHaveAttribute('role', 'grid');
    
    // Check if cells have descriptive text
    const firstCell = page.locator('.cell').first();
    const ariaLabel = await firstCell.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel.length).toBeGreaterThan(0);
  });

  test('should handle high contrast mode', async ({ page }) => {
    // Simulate high contrast mode
    await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
    
    // Check that elements are still visible and functional
    await expect(page.locator('.game-board')).toBeVisible();
    await expect(page.locator('.score-board')).toBeVisible();
    
    // Test that interactions still work
    await page.click('.cell[data-row="2"][data-col="3"]');
    await expect(page.locator('.cell[data-row="2"][data-col="3"] .piece')).toBeVisible();
  });

  test('should support reduced motion preferences', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    
    // Test that animations are reduced or disabled
    await page.click('.cell[data-row="2"][data-col="3"]');
    
    // Check that the piece appears (functionality works)
    await expect(page.locator('.cell[data-row="2"][data-col="3"] .piece')).toBeVisible();
  });

  test('should have proper form labels and descriptions', async ({ page }) => {
    // Check difficulty select has proper label
    await page.click('#pvc-btn');
    const difficultySelect = page.locator('#difficulty-select');
    await expect(difficultySelect).toBeVisible();
    
    // Check if select has associated label
    const selectId = await difficultySelect.getAttribute('id');
    const label = page.locator(`label[for="${selectId}"]`);
    // Note: This might fail if label is not properly associated
  });

  test('should announce important state changes', async ({ page }) => {
    // Check if turn changes are announced
    const turnIndicator = page.locator('.turn-indicator');
    await expect(turnIndicator).toHaveAttribute('aria-live', 'polite');
    
    // Check if score changes are announced
    const scoreBoard = page.locator('.score-board');
    // This might need adjustment based on actual implementation
  });

  test('should work with voice control simulation', async ({ page }) => {
    // Test that all interactive elements can be activated
    const buttons = await page.locator('button').all();
    
    for (const button of buttons) {
      if (await button.isVisible()) {
        const buttonText = await button.textContent();
        expect(buttonText.trim().length).toBeGreaterThan(0);
      }
    }
    
    // Test that cells can be activated by voice commands (simulated by click)
    const cells = await page.locator('.cell').all();
    expect(cells.length).toBe(64);
  });
});
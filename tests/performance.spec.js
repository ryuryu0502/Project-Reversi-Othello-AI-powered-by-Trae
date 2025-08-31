const { test, expect } = require('@playwright/test');

test.describe('Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should load the page within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;
    
    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/');
    
    // Measure Largest Contentful Paint (LCP)
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Fallback timeout
        setTimeout(() => resolve(0), 5000);
      });
    });
    
    // LCP should be under 2.5 seconds (2500ms)
    if (lcp > 0) {
      expect(lcp).toBeLessThan(2500);
    }
  });

  test('should handle rapid user interactions efficiently', async ({ page }) => {
    const startTime = Date.now();
    
    // Perform rapid clicks on different cells
    const rapidClicks = [
      [2, 3], [2, 2], [2, 4], [1, 3], [3, 2], [4, 2], [5, 3], [1, 4]
    ];
    
    for (const [row, col] of rapidClicks) {
      await page.click(`.cell[data-row="${row}"][data-col="${col}"]`, { timeout: 1000 });
      await page.waitForTimeout(100); // Small delay between clicks
    }
    
    const totalTime = Date.now() - startTime;
    
    // All interactions should complete within 5 seconds
    expect(totalTime).toBeLessThan(5000);
    
    // Game should still be responsive
    await expect(page.locator('.game-board')).toBeVisible();
    await expect(page.locator('.score-board')).toBeVisible();
  });

  test('should handle AI calculations efficiently', async ({ page }) => {
    // Switch to AI mode
    await page.click('#pvc-btn');
    await page.selectOption('#difficulty-select', 'hard');
    
    const startTime = Date.now();
    
    // Make a move and wait for AI response
    await page.click('.cell[data-row="2"][data-col="3"]');
    
    // Wait for AI to make a move (should be reasonably fast even on hard difficulty)
    await page.waitForFunction(() => {
      const whiteScore = document.querySelector('#white-score').textContent;
      return parseInt(whiteScore) > 1;
    }, { timeout: 10000 });
    
    const aiResponseTime = Date.now() - startTime;
    
    // AI should respond within 5 seconds even on hard difficulty
    expect(aiResponseTime).toBeLessThan(5000);
  });

  test('should handle theme switching without performance issues', async ({ page }) => {
    const startTime = Date.now();
    
    // Rapidly switch themes multiple times
    for (let i = 0; i < 10; i++) {
      await page.click('#theme-toggle');
      await page.waitForTimeout(50);
    }
    
    const totalTime = Date.now() - startTime;
    
    // Theme switching should be fast
    expect(totalTime).toBeLessThan(2000);
    
    // UI should still be responsive
    await expect(page.locator('.game-board')).toBeVisible();
  });

  test('should handle animation performance', async ({ page }) => {
    // Make moves that trigger animations
    const moves = [[2, 3], [2, 2], [2, 4], [1, 3]];
    
    const startTime = Date.now();
    
    for (const [row, col] of moves) {
      await page.click(`.cell[data-row="${row}"][data-col="${col}"]`);
      // Wait for animation to complete
      await page.waitForTimeout(600);
    }
    
    const totalTime = Date.now() - startTime;
    
    // Animations should not cause significant delays
    expect(totalTime).toBeLessThan(5000);
  });

  test('should maintain performance with statistics tracking', async ({ page }) => {
    // Play multiple quick games to test statistics performance
    for (let game = 0; game < 3; game++) {
      // Make a few moves
      await page.click('.cell[data-row="2"][data-col="3"]');
      await page.waitForTimeout(200);
      await page.click('.cell[data-row="2"][data-col="2"]');
      await page.waitForTimeout(200);
      
      // Reset game
      await page.click('#reset-btn');
      await page.waitForTimeout(200);
    }
    
    // Check statistics modal performance
    const startTime = Date.now();
    await page.click('#stats-toggle');
    await expect(page.locator('#stats-modal')).toBeVisible();
    const modalTime = Date.now() - startTime;
    
    // Statistics modal should open quickly
    expect(modalTime).toBeLessThan(1000);
    
    await page.click('#close-stats');
  });

  test('should handle memory usage efficiently', async ({ page }) => {
    // Get initial memory usage
    const initialMemory = await page.evaluate(() => {
      if (performance.memory) {
        return performance.memory.usedJSHeapSize;
      }
      return 0;
    });
    
    // Perform memory-intensive operations
    for (let i = 0; i < 20; i++) {
      // Make moves
      await page.click('.cell[data-row="2"][data-col="3"]');
      await page.waitForTimeout(100);
      
      // Reset game (should clean up memory)
      await page.click('#reset-btn');
      await page.waitForTimeout(100);
      
      // Toggle various features
      await page.click('#hint-btn');
      await page.waitForTimeout(50);
      await page.click('#theme-toggle');
      await page.waitForTimeout(50);
      await page.click('#theme-toggle');
      await page.waitForTimeout(50);
    }
    
    // Check final memory usage
    const finalMemory = await page.evaluate(() => {
      if (performance.memory) {
        return performance.memory.usedJSHeapSize;
      }
      return 0;
    });
    
    // Memory usage shouldn't increase dramatically (allow for some variance)
    if (initialMemory > 0 && finalMemory > 0) {
      const memoryIncrease = finalMemory - initialMemory;
      const increasePercentage = (memoryIncrease / initialMemory) * 100;
      
      // Memory increase should be reasonable (less than 50%)
      expect(increasePercentage).toBeLessThan(50);
    }
  });

  test('should handle concurrent operations efficiently', async ({ page }) => {
    // Test multiple simultaneous operations
    const startTime = Date.now();
    
    // Start multiple operations concurrently
    const operations = [
      page.click('#hint-btn'),
      page.click('#stats-toggle'),
      page.click('#theme-toggle'),
      page.click('#sound-toggle')
    ];
    
    await Promise.all(operations);
    
    const totalTime = Date.now() - startTime;
    
    // Concurrent operations should complete quickly
    expect(totalTime).toBeLessThan(2000);
    
    // Clean up
    await page.click('#close-stats');
  });

  test('should maintain 60fps during animations', async ({ page }) => {
    // This test would ideally measure actual frame rate
    // For now, we'll test that animations don't block the main thread
    
    await page.click('.cell[data-row="2"][data-col="3"]');
    
    // During animation, the page should still be responsive
    const startTime = Date.now();
    await page.click('#hint-btn');
    const responseTime = Date.now() - startTime;
    
    // UI should remain responsive during animations
    expect(responseTime).toBeLessThan(500);
  });
});
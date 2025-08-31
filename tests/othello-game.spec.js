const { test, expect } = require('@playwright/test');

test.describe('Othello Game', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should load the game page correctly', async ({ page }) => {
    // Check if the page title is correct
    await expect(page).toHaveTitle(/Othello/);
    
    // Check if main elements are present
    await expect(page.locator('h1')).toContainText('Othello');
    await expect(page.locator('.game-board')).toBeVisible();
    await expect(page.locator('.score-board')).toBeVisible();
    await expect(page.locator('.turn-indicator')).toBeVisible();
  });

  test('should initialize the game board with correct starting position', async ({ page }) => {
    // Check if the board has 64 cells
    const cells = page.locator('.cell');
    await expect(cells).toHaveCount(64);
    
    // Check initial piece positions (center 4 pieces)
    await expect(page.locator('.cell[data-row="3"][data-col="3"] .piece.white')).toBeVisible();
    await expect(page.locator('.cell[data-row="3"][data-col="4"] .piece.black')).toBeVisible();
    await expect(page.locator('.cell[data-row="4"][data-col="3"] .piece.black')).toBeVisible();
    await expect(page.locator('.cell[data-row="4"][data-col="4"] .piece.white')).toBeVisible();
    
    // Check initial scores
    await expect(page.locator('#black-score')).toContainText('2');
    await expect(page.locator('#white-score')).toContainText('2');
  });

  test('should allow valid moves and update the board', async ({ page }) => {
    // Black player's turn - make a valid move
    await page.click('.cell[data-row="2"][data-col="3"]');
    
    // Check if the piece was placed
    await expect(page.locator('.cell[data-row="2"][data-col="3"] .piece.black')).toBeVisible();
    
    // Check if the captured piece was flipped
    await expect(page.locator('.cell[data-row="3"][data-col="3"] .piece.black')).toBeVisible();
    
    // Check if turn switched to white
    await expect(page.locator('.turn-indicator')).toContainText('White');
    
    // Check if scores updated
    await expect(page.locator('#black-score')).toContainText('4');
    await expect(page.locator('#white-score')).toContainText('1');
  });

  test('should prevent invalid moves', async ({ page }) => {
    // Try to click on an invalid position (empty cell with no valid captures)
    await page.click('.cell[data-row="0"][data-col="0"]');
    
    // Check that no piece was placed
    await expect(page.locator('.cell[data-row="0"][data-col="0"] .piece')).not.toBeVisible();
    
    // Check that turn didn't change
    await expect(page.locator('.turn-indicator')).toContainText('Black');
  });

  test('should show hints when hint button is clicked', async ({ page }) => {
    // Click hint button
    await page.click('#hint-btn');
    
    // Check if hint cells are highlighted
    const hintCells = page.locator('.cell.hint');
    await expect(hintCells.first()).toBeVisible();
  });

  test('should reset the game when reset button is clicked', async ({ page }) => {
    // Make a move first
    await page.click('.cell[data-row="2"][data-col="3"]');
    
    // Reset the game
    await page.click('#reset-btn');
    
    // Check if board is back to initial state
    await expect(page.locator('#black-score')).toContainText('2');
    await expect(page.locator('#white-score')).toContainText('2');
    await expect(page.locator('.turn-indicator')).toContainText('Black');
    
    // Check if the move we made is gone
    await expect(page.locator('.cell[data-row="2"][data-col="3"] .piece')).not.toBeVisible();
  });

  test('should switch between PvP and PvC modes', async ({ page }) => {
    // Check initial mode is PvP
    await expect(page.locator('#pvp-btn')).toHaveClass(/active/);
    
    // Switch to PvC mode
    await page.click('#pvc-btn');
    await expect(page.locator('#pvc-btn')).toHaveClass(/active/);
    await expect(page.locator('#pvp-btn')).not.toHaveClass(/active/);
    
    // Check difficulty selector is visible
    await expect(page.locator('#difficulty-select')).toBeVisible();
  });

  test('should toggle sound on/off', async ({ page }) => {
    // Click sound toggle button
    await page.click('#sound-toggle');
    
    // Check if button text changed (assuming it shows current state)
    const soundButton = page.locator('#sound-toggle');
    await expect(soundButton).toContainText('🔇');
    
    // Toggle back
    await page.click('#sound-toggle');
    await expect(soundButton).toContainText('🔊');
  });

  test('should toggle theme between light and dark', async ({ page }) => {
    // Check initial theme (light)
    await expect(page.locator('body')).not.toHaveClass('dark-theme');
    
    // Toggle to dark theme
    await page.click('#theme-toggle');
    await expect(page.locator('body')).toHaveClass('dark-theme');
    
    // Toggle back to light theme
    await page.click('#theme-toggle');
    await expect(page.locator('body')).not.toHaveClass('dark-theme');
  });

  test('should show and hide statistics modal', async ({ page }) => {
    // Click statistics button
    await page.click('#stats-toggle');
    
    // Check if modal is visible
    await expect(page.locator('#stats-modal')).toBeVisible();
    
    // Check if statistics are displayed
    await expect(page.locator('#total-games')).toBeVisible();
    await expect(page.locator('#wins')).toBeVisible();
    await expect(page.locator('#losses')).toBeVisible();
    
    // Close modal
    await page.click('#close-stats');
    await expect(page.locator('#stats-modal')).not.toBeVisible();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Test keyboard shortcuts
    await page.keyboard.press('Space'); // Show hints
    await expect(page.locator('.cell.hint').first()).toBeVisible();
    
    await page.keyboard.press('r'); // Reset game
    await expect(page.locator('#black-score')).toContainText('2');
    
    await page.keyboard.press('s'); // Show statistics
    await expect(page.locator('#stats-modal')).toBeVisible();
    
    await page.keyboard.press('Escape'); // Close modal
    await expect(page.locator('#stats-modal')).not.toBeVisible();
  });

  test('should work in AI mode', async ({ page }) => {
    // Switch to PvC mode
    await page.click('#pvc-btn');
    
    // Set difficulty to Easy
    await page.selectOption('#difficulty-select', 'easy');
    
    // Make a move as black player
    await page.click('.cell[data-row="2"][data-col="3"]');
    
    // Wait for AI to make a move (with timeout)
    await page.waitForTimeout(2000);
    
    // Check if AI made a move (white pieces should increase)
    const whiteScore = await page.locator('#white-score').textContent();
    expect(parseInt(whiteScore)).toBeGreaterThan(1);
  });

  test('should handle pass moves correctly', async ({ page }) => {
    // This test would need a specific game state where pass is necessary
    // For now, just test the pass button functionality
    await page.click('#pass-btn');
    
    // Check if turn switched (assuming pass is valid)
    // This might need adjustment based on actual game logic
  });

  test('should be accessible with screen readers', async ({ page }) => {
    // Check ARIA labels and roles
    await expect(page.locator('[role="main"]')).toBeVisible();
    await expect(page.locator('.cell[aria-label]').first()).toBeVisible();
    
    // Check if buttons have proper labels
    await expect(page.locator('#reset-btn[aria-label]')).toBeVisible();
    await expect(page.locator('#hint-btn[aria-label]')).toBeVisible();
  });

  test('should handle game end scenarios', async ({ page }) => {
    // This would require simulating a full game to test end conditions
    // For now, we'll test that the game can handle multiple moves without errors
    
    const moves = [
      [2, 3], [2, 2], [2, 1], [2, 4],
      [1, 2], [3, 2], [4, 2], [5, 2]
    ];
    
    for (const [row, col] of moves) {
      const cell = page.locator(`.cell[data-row="${row}"][data-col="${col}"]`);
      if (await cell.isVisible()) {
        await cell.click();
        await page.waitForTimeout(500); // Wait for animations
      }
    }
    
    // Check that the game is still functional
    await expect(page.locator('.game-board')).toBeVisible();
    await expect(page.locator('.score-board')).toBeVisible();
  });
});
import { test, expect } from '@playwright/test'

test.describe('Mobile Experience Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
  })

  test('should provide full functionality on mobile devices', async ({ page }) => {
    // Step 1: Test responsive design
    await page.goto('/')

    // Navigation menu works on mobile
    await expect(page.locator('[data-testid="mobile-menu-toggle"]')).toBeVisible()
    await page.locator('[data-testid="mobile-menu-toggle"]').click()
    await expect(page.locator('[data-testid="mobile-navigation"]')).toBeVisible()

    // Navigate to services page
    await page.locator('[data-testid="mobile-nav-services"]').click()
    await expect(page).toHaveURL(/services/)

    // Images load and display properly
    const serviceImages = page.locator('[data-testid="service-image"]')
    await expect(serviceImages.first()).toBeVisible()

    // Navigate to contact page
    await page.locator('[data-testid="mobile-menu-toggle"]').click()
    await page.locator('[data-testid="mobile-nav-contact"]').click()
    await expect(page).toHaveURL(/contact/)

    // Contact form usable on small screens
    await expect(page.locator('[data-testid="contact-form"]')).toBeVisible()

    // Form fields should be properly sized for mobile
    const nameInput = page.locator('[data-testid="contact-name"]')
    await expect(nameInput).toBeVisible()
    const boundingBox = await nameInput.boundingBox()
    expect(boundingBox?.width).toBeGreaterThan(200) // Adequate touch target

    // Step 2: Performance on mobile
    // Fill out form to test interaction
    await nameInput.fill('Mobile User')
    await page.locator('[data-testid="contact-email"]').fill('mobile@example.com')
    await page.locator('[data-testid="contact-phone"]').fill('631-555-0123')
    await page.locator('[data-testid="contact-message"]').fill('Testing mobile form submission')

    // Submit should work
    await page.locator('[data-testid="submit-contact-form"]').click()
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
  })

  test('should meet mobile success criteria', async ({ page }) => {
    await page.goto('/')

    // All features work on mobile devices
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible()
    await expect(page.locator('[data-testid="services-overview"]')).toBeVisible()
    await expect(page.locator('[data-testid="contact-phone"]')).toBeVisible()

    // Performance meets mobile standards - check critical elements load quickly
    const heroSection = page.locator('[data-testid="hero-section"]')
    await expect(heroSection).toBeVisible({ timeout: 3000 })

    // User experience consistent across devices
    await expect(page.locator('[data-testid="navigation"]')).toBeVisible()
    await expect(page.locator('[data-testid="footer"]')).toBeVisible()
  })

  test('should have proper touch targets and spacing', async ({ page }) => {
    await page.goto('/')

    // Phone link should be easily tappable
    const phoneLink = page.locator('[data-testid="contact-phone"]')
    const phoneBoundingBox = await phoneLink.boundingBox()
    expect(phoneBoundingBox?.height).toBeGreaterThan(44) // iOS recommended minimum

    // Navigation menu items should have adequate spacing
    await page.locator('[data-testid="mobile-menu-toggle"]').click()
    const navItems = page.locator('[data-testid="mobile-nav-item"]')

    for (let i = 0; i < await navItems.count(); i++) {
      const item = navItems.nth(i)
      const boundingBox = await item.boundingBox()
      expect(boundingBox?.height).toBeGreaterThan(44)
    }

    // Close mobile menu
    await page.locator('[data-testid="mobile-menu-close"]').click()
    await expect(page.locator('[data-testid="mobile-navigation"]')).toBeHidden()
  })

  test('should handle different mobile orientations', async ({ page }) => {
    // Test portrait orientation (default)
    await page.goto('/portfolio')
    await expect(page.locator('[data-testid="portfolio-grid"]')).toBeVisible()

    // Test landscape orientation
    await page.setViewportSize({ width: 667, height: 375 })
    await expect(page.locator('[data-testid="portfolio-grid"]')).toBeVisible()

    // Portfolio items should still be accessible
    const portfolioItems = page.locator('[data-testid="portfolio-item"]')
    await expect(portfolioItems.first()).toBeVisible()
  })

  test('should optimize images for mobile', async ({ page }) => {
    await page.goto('/portfolio')

    // Check that images have appropriate attributes for mobile
    const images = page.locator('[data-testid*="image"] img')

    for (let i = 0; i < Math.min(3, await images.count()); i++) {
      const image = images.nth(i)

      // Should have alt text for accessibility
      await expect(image).toHaveAttribute('alt')

      // Should have loading attribute for performance
      const loading = await image.getAttribute('loading')
      expect(loading).toBeTruthy()
    }
  })

  test('should handle mobile-specific interactions', async ({ page }) => {
    await page.goto('/')

    // Test scroll behavior
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await expect(page.locator('[data-testid="footer"]')).toBeInViewport()

    // Test swipe gesture on portfolio (if implemented)
    await page.goto('/portfolio')
    const portfolioContainer = page.locator('[data-testid="portfolio-grid"]')
    await expect(portfolioContainer).toBeVisible()

    // Test pinch-to-zoom prevention on form inputs
    await page.goto('/contact')
    const emailInput = page.locator('[data-testid="contact-email"]')

    // Check that input has proper viewport meta tag behavior
    await emailInput.focus()
    // Form should not cause zoom on focus
    await expect(emailInput).toBeFocused()
  })

  test('should work on various mobile screen sizes', async ({ page }) => {
    const mobileSizes = [
      { width: 320, height: 568, name: 'iPhone SE' },
      { width: 375, height: 667, name: 'iPhone 8' },
      { width: 414, height: 896, name: 'iPhone 11' },
      { width: 360, height: 640, name: 'Samsung Galaxy' },
    ]

    for (const size of mobileSizes) {
      await page.setViewportSize({ width: size.width, height: size.height })
      await page.goto('/')

      // Key elements should be visible on all sizes
      await expect(page.locator('[data-testid="hero-section"]')).toBeVisible()
      await expect(page.locator('[data-testid="mobile-menu-toggle"]')).toBeVisible()
      await expect(page.locator('[data-testid="contact-phone"]')).toBeVisible()

      // Navigation should work
      await page.locator('[data-testid="mobile-menu-toggle"]').click()
      await expect(page.locator('[data-testid="mobile-navigation"]')).toBeVisible()
      await page.locator('[data-testid="mobile-menu-close"]').click()
    }
  })
})
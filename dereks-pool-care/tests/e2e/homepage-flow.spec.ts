import { test, expect } from '@playwright/test'

test.describe('Homepage Visitor Flow', () => {
  test('should allow potential customer to understand services and contact Derek', async ({ page }) => {
    await page.goto('/')

    // Step 1: Navigate to homepage - Company name and tagline clearly visible
    await expect(page.locator('h1')).toContainText("Derek's Complete Pool Care")
    await expect(page.locator('[data-testid="tagline"]')).toBeVisible()
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible()

    // Contact phone number prominently displayed
    await expect(page.locator('[data-testid="contact-phone"]')).toContainText('(631) 320-8271')

    // Step 2: Review services overview - Three main services showcased with icons
    const serviceCards = page.locator('[data-testid="service-card"]')
    await expect(serviceCards).toHaveCount(3)

    // Starting prices with "Contact for details"
    await expect(page.locator('[data-testid="service-pricing"]').first()).toBeVisible()

    // Brief service descriptions visible
    await expect(page.locator('[data-testid="service-description"]').first()).toBeVisible()

    // Step 3: View social proof - Customer testimonials section
    await expect(page.locator('[data-testid="testimonials-section"]')).toBeVisible()

    // 5.0-star rating prominently displayed
    await expect(page.locator('[data-testid="average-rating"]')).toContainText('5.0')

    // Before/after portfolio preview
    await expect(page.locator('[data-testid="portfolio-preview"]')).toBeVisible()

    // Step 4: Contact Derek - Multiple contact options available
    await expect(page.locator('[data-testid="contact-methods"]')).toBeVisible()
    await expect(page.locator('[data-testid="contact-phone"]')).toBeVisible()
    await expect(page.locator('[data-testid="contact-form-link"]')).toBeVisible()

    // Emergency service availability noted
    await expect(page.locator('[data-testid="emergency-service"]')).toBeVisible()

    // Service area clearly stated
    await expect(page.locator('[data-testid="service-area"]')).toContainText('Holbrook, NY')
  })

  test('should meet success criteria', async ({ page }) => {
    await page.goto('/')

    // User can understand services within 30 seconds
    await expect(page.locator('[data-testid="services-overview"]')).toBeVisible()
    await expect(page.locator('[data-testid="service-card"]').first()).toBeVisible()

    // Contact information accessible from any section
    const contactButtons = page.locator('[data-testid*="contact"]')
    await expect(contactButtons.first()).toBeVisible()

    // Professional, trustworthy appearance
    await expect(page.locator('[data-testid="company-logo"]')).toBeVisible()
    await expect(page.locator('[data-testid="testimonials-section"]')).toBeVisible()
  })

  test('should have responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    await expect(page.locator('[data-testid="mobile-menu-toggle"]')).toBeVisible()
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible()
    await expect(page.locator('[data-testid="contact-phone"]')).toBeVisible()

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('[data-testid="navigation-menu"]')).toBeVisible()
    await expect(page.locator('[data-testid="service-card"]')).toHaveCount(3)
  })
})
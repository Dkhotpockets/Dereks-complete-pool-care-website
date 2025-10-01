import { test, expect } from '@playwright/test'

test.describe('Service Research and Pricing Flow', () => {
  test('should allow customer to research specific services and pricing', async ({ page }) => {
    // Step 1: Navigate to services page
    await page.goto('/services')

    // All three services detailed
    const serviceCards = page.locator('[data-testid="service-detail-card"]')
    await expect(serviceCards).toHaveCount(3)

    // Weekly maintenance features listed
    const maintenanceCard = page.locator('[data-testid="service-weekly-maintenance"]')
    await expect(maintenanceCard).toBeVisible()
    await expect(maintenanceCard.locator('[data-testid="service-features"]')).toBeVisible()

    // Equipment repair capabilities shown
    const repairCard = page.locator('[data-testid="service-equipment-repair"]')
    await expect(repairCard).toBeVisible()
    await expect(repairCard.locator('[data-testid="service-capabilities"]')).toBeVisible()

    // Pool closing seasonal information
    const closingCard = page.locator('[data-testid="service-pool-closing"]')
    await expect(closingCard).toBeVisible()
    await expect(closingCard.locator('[data-testid="seasonal-info"]')).toBeVisible()

    // Step 2: Review service details
    // Each service has comprehensive description
    for (let i = 0; i < 3; i++) {
      await expect(serviceCards.nth(i).locator('[data-testid="service-description"]')).toBeVisible()
    }

    // Starting prices displayed where appropriate
    await expect(page.locator('[data-testid="service-pricing"]').first()).toBeVisible()

    // "Contact for details" call-to-action prominent
    const contactButtons = page.locator('[data-testid="contact-for-quote"]')
    await expect(contactButtons.first()).toBeVisible()

    // Step 3: View related portfolio work
    // Service-specific before/after photos
    await expect(page.locator('[data-testid="service-portfolio-preview"]')).toBeVisible()

    // Project descriptions and results
    await expect(page.locator('[data-testid="portfolio-project-description"]').first()).toBeVisible()

    // Link to full portfolio gallery
    await expect(page.locator('[data-testid="view-full-portfolio"]')).toBeVisible()
  })

  test('should meet success criteria', async ({ page }) => {
    await page.goto('/services')

    // Services clearly differentiated
    const serviceTitles = page.locator('[data-testid="service-title"]')
    await expect(serviceTitles).toHaveCount(3)

    const titles = await serviceTitles.allTextContents()
    expect(titles).toContain('Weekly Pool Maintenance')
    expect(titles).toContain('Equipment Repair')
    expect(titles).toContain('Professional Pool Closings')

    // Pricing transparency without giving exact quotes
    const pricingElements = page.locator('[data-testid="service-pricing"]')
    await expect(pricingElements.first()).toContainText(/starting|contact/i)

    // Easy transition to contact or portfolio
    await expect(page.locator('[data-testid="contact-for-quote"]').first()).toBeVisible()
    await expect(page.locator('[data-testid="view-portfolio"]').first()).toBeVisible()
  })

  test('should navigate between service details', async ({ page }) => {
    await page.goto('/services')

    // Click on maintenance service
    await page.locator('[data-testid="service-weekly-maintenance"]').click()
    await expect(page.locator('[data-testid="service-features"]')).toBeVisible()

    // Click on repair service
    await page.locator('[data-testid="service-equipment-repair"]').click()
    await expect(page.locator('[data-testid="repair-capabilities"]')).toBeVisible()

    // Click on closing service
    await page.locator('[data-testid="service-pool-closing"]').click()
    await expect(page.locator('[data-testid="closing-process"]')).toBeVisible()
  })

  test('should link to contact form from services', async ({ page }) => {
    await page.goto('/services')

    // Click contact button from first service
    await page.locator('[data-testid="contact-for-quote"]').first().click()

    // Should navigate to contact page or open contact form
    await expect(page).toHaveURL(/contact/)
    await expect(page.locator('[data-testid="contact-form"]')).toBeVisible()
  })
})
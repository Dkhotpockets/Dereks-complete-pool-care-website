import { test, expect } from '@playwright/test'

test.describe('Portfolio and Trust Building Flow', () => {
  test('should allow customer to view work quality and build confidence', async ({ page }) => {
    // Step 1: Navigate to portfolio
    await page.goto('/portfolio')

    // Grid layout of before/after projects
    await expect(page.locator('[data-testid="portfolio-grid"]')).toBeVisible()
    const portfolioItems = page.locator('[data-testid="portfolio-item"]')
    await expect(portfolioItems).toHaveCount.greaterThan(0)

    // Project details and service types
    await expect(portfolioItems.first().locator('[data-testid="project-title"]')).toBeVisible()
    await expect(portfolioItems.first().locator('[data-testid="service-type"]')).toBeVisible()

    // High-quality images optimized for web
    const beforeImages = page.locator('[data-testid="before-image"]')
    const afterImages = page.locator('[data-testid="after-image"]')
    await expect(beforeImages.first()).toBeVisible()
    await expect(afterImages.first()).toBeVisible()

    // Step 2: Review specific projects
    // Click to view larger images
    await beforeImages.first().click()
    await expect(page.locator('[data-testid="portfolio-lightbox"]')).toBeVisible()

    // Project descriptions and completion details
    await expect(page.locator('[data-testid="project-description"]')).toBeVisible()
    await expect(page.locator('[data-testid="completion-date"]')).toBeVisible()

    // Related service information
    await expect(page.locator('[data-testid="related-service"]')).toBeVisible()

    // Close lightbox
    await page.locator('[data-testid="close-lightbox"]').click()
    await expect(page.locator('[data-testid="portfolio-lightbox"]')).toBeHidden()

    // Step 3: Read customer testimonials
    // Featured reviews with star ratings
    await expect(page.locator('[data-testid="featured-testimonials"]')).toBeVisible()
    const testimonials = page.locator('[data-testid="testimonial-card"]')
    await expect(testimonials.first()).toBeVisible()

    // Service-specific feedback
    await expect(testimonials.first().locator('[data-testid="service-feedback"]')).toBeVisible()

    // Recent review dates
    await expect(testimonials.first().locator('[data-testid="review-date"]')).toBeVisible()
  })

  test('should meet success criteria', async ({ page }) => {
    await page.goto('/portfolio')

    // Image quality demonstrates professionalism
    const images = page.locator('[data-testid*="image"]')
    await expect(images.first()).toBeVisible()

    // Check image loading and aspect ratios
    const image = images.first()
    await expect(image).toHaveAttribute('alt')
    await expect(image).toHaveAttribute('src')

    // Projects cover all service types
    const serviceTypes = page.locator('[data-testid="service-type"]')
    const serviceTypeTexts = await serviceTypes.allTextContents()
    expect(serviceTypeTexts).toContain('Maintenance')
    expect(serviceTypeTexts).toContain('Repair')

    // Testimonials feel authentic and recent
    const testimonials = page.locator('[data-testid="testimonial-card"]')
    await expect(testimonials.first().locator('[data-testid="customer-name"]')).toBeVisible()
    await expect(testimonials.first().locator('[data-testid="review-date"]')).toBeVisible()
  })

  test('should filter portfolio by service type', async ({ page }) => {
    await page.goto('/portfolio')

    // Test maintenance filter
    await page.locator('[data-testid="filter-maintenance"]').click()
    const maintenanceItems = page.locator('[data-testid="portfolio-item"][data-service-type="maintenance"]')
    await expect(maintenanceItems.first()).toBeVisible()

    // Test repair filter
    await page.locator('[data-testid="filter-repair"]').click()
    const repairItems = page.locator('[data-testid="portfolio-item"][data-service-type="repair"]')
    await expect(repairItems.first()).toBeVisible()

    // Test "all" filter
    await page.locator('[data-testid="filter-all"]').click()
    const allItems = page.locator('[data-testid="portfolio-item"]')
    await expect(allItems).toHaveCount.greaterThan(1)
  })

  test('should navigate lightbox gallery', async ({ page }) => {
    await page.goto('/portfolio')

    // Open first image in lightbox
    await page.locator('[data-testid="portfolio-item"]').first().click()
    await expect(page.locator('[data-testid="portfolio-lightbox"]')).toBeVisible()

    // Navigate to next image
    await page.locator('[data-testid="next-image"]').click()
    await expect(page.locator('[data-testid="portfolio-lightbox"]')).toBeVisible()

    // Navigate to previous image
    await page.locator('[data-testid="prev-image"]').click()
    await expect(page.locator('[data-testid="portfolio-lightbox"]')).toBeVisible()

    // Close with keyboard
    await page.keyboard.press('Escape')
    await expect(page.locator('[data-testid="portfolio-lightbox"]')).toBeHidden()
  })

  test('should link to contact from portfolio items', async ({ page }) => {
    await page.goto('/portfolio')

    // Click contact button from portfolio item
    await page.locator('[data-testid="contact-from-portfolio"]').first().click()

    // Should navigate to contact page with service pre-selected
    await expect(page).toHaveURL(/contact/)
    await expect(page.locator('[data-testid="contact-form"]')).toBeVisible()
  })
})
import { test, expect } from '@playwright/test'

test.describe('Contact and Service Inquiry Flow', () => {
  test('should allow customer to submit inquiry and receive confirmation', async ({ page }) => {
    // Step 1: Navigate to contact page
    await page.goto('/contact')

    // Contact form with service selection
    await expect(page.locator('[data-testid="contact-form"]')).toBeVisible()
    await expect(page.locator('[data-testid="service-selection"]')).toBeVisible()

    // Business information clearly displayed
    await expect(page.locator('[data-testid="business-info"]')).toBeVisible()
    await expect(page.locator('[data-testid="business-phone"]')).toContainText('(631) 320-8271')
    await expect(page.locator('[data-testid="business-address"]')).toContainText('Holbrook, NY')

    // Multiple contact method options
    await expect(page.locator('[data-testid="contact-methods"]')).toBeVisible()
    await expect(page.locator('[data-testid="phone-contact"]')).toBeVisible()
    await expect(page.locator('[data-testid="email-contact"]')).toBeVisible()

    // Step 2: Submit service inquiry
    // Fill out form with validation
    await page.locator('[data-testid="contact-name"]').fill('John Doe')
    await page.locator('[data-testid="contact-email"]').fill('john@example.com')
    await page.locator('[data-testid="contact-phone"]').fill('631-555-0123')

    // Service type selection available
    await page.locator('[data-testid="service-selection"]').selectOption('weekly-maintenance')

    // Emergency vs routine options
    await expect(page.locator('[data-testid="emergency-checkbox"]')).toBeVisible()

    await page.locator('[data-testid="contact-message"]').fill('I need weekly pool maintenance service for my pool in Holbrook.')

    // Submit form
    await page.locator('[data-testid="submit-contact-form"]').click()

    // Step 3: Receive confirmation
    // Success message displays
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
    await expect(page.locator('[data-testid="success-message"]')).toContainText(/thank you|success/i)

    // Expected response time communicated
    await expect(page.locator('[data-testid="response-time"]')).toBeVisible()

    // Alternative contact methods shown
    await expect(page.locator('[data-testid="alternative-contact"]')).toBeVisible()
  })

  test('should meet success criteria', async ({ page }) => {
    await page.goto('/contact')

    // Form submission works without errors
    await page.locator('[data-testid="contact-name"]').fill('Test User')
    await page.locator('[data-testid="contact-email"]').fill('test@example.com')
    await page.locator('[data-testid="contact-phone"]').fill('631-555-0123')
    await page.locator('[data-testid="service-selection"]').selectOption('equipment-repair')
    await page.locator('[data-testid="contact-message"]').fill('Test message')

    await page.locator('[data-testid="submit-contact-form"]').click()

    // Should not show error messages
    await expect(page.locator('[data-testid="form-error"]')).toBeHidden()

    // Validation provides helpful feedback
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()

    // Customer knows what to expect next
    await expect(page.locator('[data-testid="next-steps"]')).toBeVisible()
  })

  test('should validate form inputs', async ({ page }) => {
    await page.goto('/contact')

    // Try to submit empty form
    await page.locator('[data-testid="submit-contact-form"]').click()

    // Should show validation errors
    await expect(page.locator('[data-testid="name-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="email-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="phone-error"]')).toBeVisible()

    // Test invalid email
    await page.locator('[data-testid="contact-name"]').fill('John Doe')
    await page.locator('[data-testid="contact-email"]').fill('invalid-email')
    await page.locator('[data-testid="submit-contact-form"]').click()

    await expect(page.locator('[data-testid="email-error"]')).toContainText(/invalid|format/i)

    // Test invalid phone format
    await page.locator('[data-testid="contact-email"]').fill('john@example.com')
    await page.locator('[data-testid="contact-phone"]').fill('123')
    await page.locator('[data-testid="submit-contact-form"]').click()

    await expect(page.locator('[data-testid="phone-error"]')).toContainText(/invalid|format/i)
  })

  test('should handle emergency requests differently', async ({ page }) => {
    await page.goto('/contact')

    // Fill out emergency form
    await page.locator('[data-testid="contact-name"]').fill('Emergency User')
    await page.locator('[data-testid="contact-email"]').fill('emergency@example.com')
    await page.locator('[data-testid="contact-phone"]').fill('631-555-0123')
    await page.locator('[data-testid="service-selection"]').selectOption('equipment-repair')
    await page.locator('[data-testid="emergency-checkbox"]').check()
    await page.locator('[data-testid="contact-message"]').fill('My pool pump is broken and water is green!')

    await page.locator('[data-testid="submit-contact-form"]').click()

    // Should show emergency response message
    await expect(page.locator('[data-testid="emergency-response"]')).toBeVisible()
    await expect(page.locator('[data-testid="emergency-response"]')).toContainText(/emergency|urgent|priority/i)
  })

  test('should provide multiple contact options', async ({ page }) => {
    await page.goto('/contact')

    // Phone contact should be clickable
    const phoneLink = page.locator('[data-testid="phone-contact"]')
    await expect(phoneLink).toHaveAttribute('href', 'tel:+16313208271')

    // Email contact should be available
    await expect(page.locator('[data-testid="email-contact"]')).toBeVisible()

    // Social media links should be present
    await expect(page.locator('[data-testid="social-links"]')).toBeVisible()

    // Business hours should be displayed
    await expect(page.locator('[data-testid="business-hours"]')).toBeVisible()
  })
})
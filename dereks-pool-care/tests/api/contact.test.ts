import { describe, it, expect } from '@jest/globals'

describe('POST /api/contact', () => {
  it('should accept valid contact form submission', async () => {
    const validFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '631-555-0123',
      serviceType: 'weekly-maintenance',
      message: 'Need weekly pool cleaning service',
      isEmergency: false,
    }

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validFormData),
    })

    expect(response.status).toBe(200)
    const result = await response.json()
    expect(result.success).toBe(true)
    expect(result.message).toBeDefined()
  })

  it('should reject invalid email format', async () => {
    const invalidFormData = {
      name: 'John Doe',
      email: 'invalid-email',
      phone: '631-555-0123',
      serviceType: 'weekly-maintenance',
      message: 'Test message',
      isEmergency: false,
    }

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidFormData),
    })

    expect(response.status).toBe(400)
    const result = await response.json()
    expect(result.success).toBe(false)
    expect(result.errors).toContain('email')
  })

  it('should require all mandatory fields', async () => {
    const incompleteFormData = {
      name: 'John Doe',
      // Missing email, phone, serviceType, message
    }

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(incompleteFormData),
    })

    expect(response.status).toBe(400)
    const result = await response.json()
    expect(result.success).toBe(false)
    expect(result.errors).toBeDefined()
  })
})
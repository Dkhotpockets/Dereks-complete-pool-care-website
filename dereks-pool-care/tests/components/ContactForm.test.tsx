import { describe, it, expect, vi } from '@jest/globals'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '@/components/forms/ContactForm'

// Mock the fetch function
global.fetch = vi.fn()

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render all form fields', () => {
    render(<ContactForm />)

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/service type/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/emergency/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  it('should validate required fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)

    expect(screen.getByText(/name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/phone is required/i)).toBeInTheDocument()
  })

  it('should validate email format', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, 'invalid-email')

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)

    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument()
  })

  it('should submit form with valid data', async () => {
    const user = userEvent.setup()
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Form submitted successfully' }),
    } as Response)

    render(<ContactForm />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/phone/i), '631-555-0123')
    await user.selectOptions(screen.getByLabelText(/service type/i), 'weekly-maintenance')
    await user.type(screen.getByLabelText(/message/i), 'Need pool cleaning service')

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          phone: '631-555-0123',
          serviceType: 'weekly-maintenance',
          message: 'Need pool cleaning service',
          isEmergency: false,
        }),
      })
    })
  })

  it('should display success message after successful submission', async () => {
    const user = userEvent.setup()
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Thank you for your inquiry!' }),
    } as Response)

    render(<ContactForm />)

    // Fill out form
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/phone/i), '631-555-0123')
    await user.selectOptions(screen.getByLabelText(/service type/i), 'weekly-maintenance')
    await user.type(screen.getByLabelText(/message/i), 'Test message')

    await user.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(screen.getByText(/thank you for your inquiry/i)).toBeInTheDocument()
    })
  })
})
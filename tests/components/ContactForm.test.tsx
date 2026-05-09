import { describe, it, expect, jest } from '@jest/globals'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '@/components/ContactForm'

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render all form fields', () => {
    render(<ContactForm />)

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/service requested/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('should validate required fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument()
    expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
    expect(screen.getByText(/phone must be in format/i)).toBeInTheDocument()
  })

  it('should validate email format', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, 'invalid-email')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
  })

  it('should submit form with valid data', async () => {
    const user = userEvent.setup()
    const mockFetch = fetch as any
    mockFetch.mockResponseOnce(JSON.stringify({ success: true, message: 'Form submitted successfully' }))

    render(<ContactForm />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/phone/i), '631-555-0123')
    await user.selectOptions(screen.getByLabelText(/service requested/i), 'Premium')
    await user.type(screen.getByLabelText(/message/i), 'Need pool cleaning service')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          phone: '(631) 555-0123',
          serviceRequested: 'Premium',
          message: 'Need pool cleaning service',
        }),
      })
    })
  })

  it('should display success message after successful submission', async () => {
    const user = userEvent.setup()
    const mockFetch = fetch as any
    mockFetch.mockResponseOnce(JSON.stringify({ success: true, message: 'Thank you for your inquiry!' }))

    render(<ContactForm />)

    // Fill out form
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/phone/i), '631-555-0123')
    await user.selectOptions(screen.getByLabelText(/service requested/i), 'Premium')
    await user.type(screen.getByLabelText(/message/i), 'Test message')

    await user.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => {
      expect(screen.getByText(/thank you! we'll contact you within 24 hours/i)).toBeInTheDocument()
    })
  })
})
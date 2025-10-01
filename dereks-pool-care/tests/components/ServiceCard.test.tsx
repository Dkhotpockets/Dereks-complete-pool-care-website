import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { ServiceCard } from '@/components/sections/ServiceCard'

describe('ServiceCard', () => {
  const mockService = {
    id: '1',
    name: 'Weekly Pool Maintenance',
    description: 'Complete weekly pool cleaning and maintenance service',
    features: [
      'Chemical balancing',
      'Debris removal',
      'Filter cleaning',
      'Equipment inspection',
    ],
    startingPrice: '$120',
    duration: 'per visit',
    category: 'maintenance',
    icon: 'pool-maintenance',
  }

  it('should render service information', () => {
    render(<ServiceCard service={mockService} />)

    expect(screen.getByText('Weekly Pool Maintenance')).toBeInTheDocument()
    expect(screen.getByText('Complete weekly pool cleaning and maintenance service')).toBeInTheDocument()
    expect(screen.getByText('Starting at $120 per visit')).toBeInTheDocument()
  })

  it('should render all service features', () => {
    render(<ServiceCard service={mockService} />)

    expect(screen.getByText('Chemical balancing')).toBeInTheDocument()
    expect(screen.getByText('Debris removal')).toBeInTheDocument()
    expect(screen.getByText('Filter cleaning')).toBeInTheDocument()
    expect(screen.getByText('Equipment inspection')).toBeInTheDocument()
  })

  it('should render contact button', () => {
    render(<ServiceCard service={mockService} />)

    const contactButton = screen.getByRole('button', { name: /get quote/i })
    expect(contactButton).toBeInTheDocument()
  })

  it('should display service icon', () => {
    render(<ServiceCard service={mockService} />)

    const icon = screen.getByTestId(`service-icon-${mockService.icon}`)
    expect(icon).toBeInTheDocument()
  })

  it('should handle services without starting price', () => {
    const serviceWithoutPrice = {
      ...mockService,
      startingPrice: null,
    }

    render(<ServiceCard service={serviceWithoutPrice} />)

    expect(screen.getByText('Contact for pricing')).toBeInTheDocument()
  })

  it('should apply correct styling for emergency services', () => {
    const emergencyService = {
      ...mockService,
      category: 'emergency',
      name: 'Emergency Repair',
    }

    render(<ServiceCard service={emergencyService} />)

    const card = screen.getByTestId('service-card')
    expect(card).toHaveClass('border-destructive')
  })
})
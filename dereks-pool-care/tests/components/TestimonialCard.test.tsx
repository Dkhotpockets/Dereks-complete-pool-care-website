import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { TestimonialCard } from '@/components/sections/TestimonialCard'

describe('TestimonialCard', () => {
  const mockTestimonial = {
    id: '1',
    name: 'Sarah Johnson',
    location: 'Holbrook, NY',
    rating: 5,
    comment: 'Derek does an amazing job keeping our pool crystal clear. Very professional and reliable service.',
    serviceType: 'weekly-maintenance',
    date: '2024-08-15',
    verified: true,
  }

  it('should render testimonial content', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />)

    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
    expect(screen.getByText('Holbrook, NY')).toBeInTheDocument()
    expect(screen.getByText(/Derek does an amazing job keeping our pool crystal clear/)).toBeInTheDocument()
  })

  it('should display star rating', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />)

    const stars = screen.getAllByTestId('star-icon')
    expect(stars).toHaveLength(5)

    // All stars should be filled for 5-star rating
    const filledStars = stars.filter(star => star.classList.contains('fill-yellow-400'))
    expect(filledStars).toHaveLength(5)
  })

  it('should handle partial ratings', () => {
    const partialRatingTestimonial = {
      ...mockTestimonial,
      rating: 4,
    }

    render(<TestimonialCard testimonial={partialRatingTestimonial} />)

    const stars = screen.getAllByTestId('star-icon')
    const filledStars = stars.filter(star => star.classList.contains('fill-yellow-400'))
    const emptyStars = stars.filter(star => star.classList.contains('fill-gray-200'))

    expect(filledStars).toHaveLength(4)
    expect(emptyStars).toHaveLength(1)
  })

  it('should display service type badge', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />)

    expect(screen.getByText('Weekly Maintenance')).toBeInTheDocument()
  })

  it('should show verified badge for verified testimonials', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />)

    expect(screen.getByText('Verified Customer')).toBeInTheDocument()
    expect(screen.getByTestId('verified-badge')).toBeInTheDocument()
  })

  it('should not show verified badge for unverified testimonials', () => {
    const unverifiedTestimonial = {
      ...mockTestimonial,
      verified: false,
    }

    render(<TestimonialCard testimonial={unverifiedTestimonial} />)

    expect(screen.queryByText('Verified Customer')).not.toBeInTheDocument()
    expect(screen.queryByTestId('verified-badge')).not.toBeInTheDocument()
  })

  it('should format testimonial date', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />)

    expect(screen.getByText('August 2024')).toBeInTheDocument()
  })

  it('should truncate long testimonials with read more option', () => {
    const longTestimonial = {
      ...mockTestimonial,
      comment: 'Derek does an amazing job keeping our pool crystal clear. Very professional and reliable service. '.repeat(10),
    }

    render(<TestimonialCard testimonial={longTestimonial} />)

    expect(screen.getByText('Read more')).toBeInTheDocument()
  })

  it('should apply correct styling for different service types', () => {
    const emergencyTestimonial = {
      ...mockTestimonial,
      serviceType: 'emergency',
    }

    render(<TestimonialCard testimonial={emergencyTestimonial} />)

    const serviceTypeBadge = screen.getByText('Emergency')
    expect(serviceTypeBadge).toHaveClass('bg-destructive')
  })
})
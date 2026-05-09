import { describe, it, expect, vi } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PortfolioGallery } from '@/components/portfolio/PortfolioGallery'

describe('PortfolioGallery', () => {
  const mockPortfolioItems = [
    {
      id: '1',
      title: 'Pool Renovation Project',
      description: 'Complete pool resurfacing and equipment upgrade',
      beforeImage: '/images/portfolio/project1-before.jpg',
      afterImage: '/images/portfolio/project1-after.jpg',
      serviceType: 'renovation',
      completionDate: '2024-06-15',
      location: 'Holbrook, NY',
    },
    {
      id: '2',
      title: 'Chemical Balance Recovery',
      description: 'Green pool recovery and chemical rebalancing',
      beforeImage: '/images/portfolio/project2-before.jpg',
      afterImage: '/images/portfolio/project2-after.jpg',
      serviceType: 'maintenance',
      completionDate: '2024-07-20',
      location: 'Ronkonkoma, NY',
    },
  ]

  it('should render portfolio grid', () => {
    render(<PortfolioGallery items={mockPortfolioItems} />)

    expect(screen.getByText('Pool Renovation Project')).toBeInTheDocument()
    expect(screen.getByText('Chemical Balance Recovery')).toBeInTheDocument()
  })

  it('should display before and after images', () => {
    render(<PortfolioGallery items={mockPortfolioItems} />)

    const beforeImages = screen.getAllByAltText(/before/i)
    const afterImages = screen.getAllByAltText(/after/i)

    expect(beforeImages).toHaveLength(2)
    expect(afterImages).toHaveLength(2)
  })

  it('should open lightbox when image is clicked', async () => {
    const user = userEvent.setup()
    render(<PortfolioGallery items={mockPortfolioItems} />)

    const firstImage = screen.getAllByAltText(/before/i)[0]
    await user.click(firstImage)

    expect(screen.getByTestId('portfolio-lightbox')).toBeInTheDocument()
  })

  it('should filter by service type', async () => {
    const user = userEvent.setup()
    render(<PortfolioGallery items={mockPortfolioItems} />)

    const renovationFilter = screen.getByRole('button', { name: /renovation/i })
    await user.click(renovationFilter)

    expect(screen.getByText('Pool Renovation Project')).toBeInTheDocument()
    expect(screen.queryByText('Chemical Balance Recovery')).not.toBeInTheDocument()
  })

  it('should show all items when "All" filter is selected', async () => {
    const user = userEvent.setup()
    render(<PortfolioGallery items={mockPortfolioItems} />)

    const allFilter = screen.getByRole('button', { name: /all/i })
    await user.click(allFilter)

    expect(screen.getByText('Pool Renovation Project')).toBeInTheDocument()
    expect(screen.getByText('Chemical Balance Recovery')).toBeInTheDocument()
  })

  it('should display project completion dates', () => {
    render(<PortfolioGallery items={mockPortfolioItems} />)

    expect(screen.getByText('June 2024')).toBeInTheDocument()
    expect(screen.getByText('July 2024')).toBeInTheDocument()
  })

  it('should navigate lightbox with keyboard', async () => {
    const user = userEvent.setup()
    render(<PortfolioGallery items={mockPortfolioItems} />)

    const firstImage = screen.getAllByAltText(/before/i)[0]
    await user.click(firstImage)

    const lightbox = screen.getByTestId('portfolio-lightbox')
    fireEvent.keyDown(lightbox, { key: 'ArrowRight' })

    // Should navigate to next image
    expect(screen.getByText('Chemical Balance Recovery')).toBeInTheDocument()
  })

  it('should close lightbox with Escape key', async () => {
    const user = userEvent.setup()
    render(<PortfolioGallery items={mockPortfolioItems} />)

    const firstImage = screen.getAllByAltText(/before/i)[0]
    await user.click(firstImage)

    const lightbox = screen.getByTestId('portfolio-lightbox')
    fireEvent.keyDown(lightbox, { key: 'Escape' })

    expect(screen.queryByTestId('portfolio-lightbox')).not.toBeInTheDocument()
  })
})
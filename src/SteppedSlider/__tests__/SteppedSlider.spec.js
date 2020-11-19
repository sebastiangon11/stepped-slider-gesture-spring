import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { SteppedSlider } from '../SteppedSlider'

import '@testing-library/jest-dom'

const Component = ({ children }) => {
  const [activeIndex, onIndexChange] = React.useState(0)

  return (
    <div style={{ width: 1000 }}>
      {React.cloneElement(children, {
        activeIndex,
        onIndexChange
      })}
      <button onClick={() => onIndexChange(activeIndex - 1)}>Prev</button>
      <button onClick={() => onIndexChange(activeIndex + 1)}>Next</button>
    </div>
  )
}

describe('SteppedSlider', () => {
  test('should not break if no props or children are provided', () => {
    render(<SteppedSlider />)
  })

  test('should render every child provided and move change slide when active index changes', async () => {
    render(
      <Component>
        <SteppedSlider>
          <div>child 1</div>
          <div>child 2</div>
          <div>Child 3</div>
        </SteppedSlider>
      </Component>
    )

    const firstSlide = screen.getByText('child 1')

    /** Check initial position */
    expect(firstSlide.parentElement).toHaveStyle('transform: translate3d(0%,0,0) scale(1);')

    fireEvent.click(screen.getByText('Next'))
    await waitFor(() => expect(firstSlide.parentElement).toHaveStyle('transform: translate3d(-100%,0,0) scale(1);'))

    fireEvent.click(screen.getByText('Next'))
    await waitFor(() => expect(firstSlide.parentElement).toHaveStyle('transform: translate3d(-200%,0,0) scale(1);'))

    fireEvent.click(screen.getByText('Prev'))
    await waitFor(() => expect(firstSlide.parentElement).toHaveStyle('transform: translate3d(-100%,0,0) scale(1);'))

    fireEvent.click(screen.getByText('Next'))
    await waitFor(() => expect(firstSlide.parentElement).toHaveStyle('transform: translate3d(-200%,0,0) scale(1);'))

    /** No more slides to move */
    fireEvent.click(screen.getByText('Next'))
    await waitFor(() => expect(firstSlide.parentElement).toHaveStyle('transform: translate3d(-200%,0,0) scale(1);'))
  })

  test('should sub scale inactive slides if subScaleInactives is true', async () => {
    render(
      <Component>
        <SteppedSlider subScaleInactives>
          <div>child 1</div>
          <div>child 2</div>
          <div>child 3</div>
        </SteppedSlider>
      </Component>
    )

    const firstSlide = screen.getByText('child 1')
    const secondSlide = screen.getByText('child 2')
    const thirdSlide = screen.getByText('child 3')

    /** Check initial position */
    expect(firstSlide.parentElement).toHaveStyle('transform: translate3d(0%,0,0) scale(1);')
    expect(secondSlide.parentElement).toHaveStyle('transform: translate3d(100%,0,0) scale(0.9);')
    expect(thirdSlide.parentElement).toHaveStyle('transform: translate3d(200%,0,0) scale(0.9);')

    /** Move to next child */
    fireEvent.click(screen.getByText('Next'))
    await waitFor(() => expect(firstSlide.parentElement).toHaveStyle('transform: translate3d(-100%,0,0) scale(0.9);'))
    await waitFor(() => expect(secondSlide.parentElement).toHaveStyle('transform: translate3d(0%,0,0) scale(1);'))
    await waitFor(() => expect(thirdSlide.parentElement).toHaveStyle('transform: translate3d(100%,0,0) scale(0.9);'))
  })
})

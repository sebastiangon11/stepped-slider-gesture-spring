/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSprings, to } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import clamp from 'lodash-es/clamp'

import { ImageContainerDiv } from './SteppedSlider.styles'

import { AlignStrategies } from './align-strategies'

export const SteppedSlider = ({
  children,
  activeIndex = 0,
  onIndexChange = () => {},
  subScaleInactives = false,
  spacing = 0,
  overflow = 'hidden',
  height = 100,
  slidewidth = 100,
  align
}) => {
  const slides = React.Children.toArray(children)

  const index = useRef(0)

  useEffect(() => {
    if (activeIndex !== index.current) moveSlide(activeIndex)
  }, [activeIndex])

  // Returns fitting styles for dragged/idle items
  const calculateMovement = ({ xMov = 0, down = false } = {}) => (springIndex) => {
    const spacingPercentage = (spacing * 100) / slidewidth
    const offset = 100 - (slidewidth - spacing)
    const offsetPercentage = (offset / slidewidth) * 100
    const currentSlideIndex = index.current
    const slidesCount = slides.length - 1

    let x = (springIndex - currentSlideIndex) * 100

    if (typeof AlignStrategies[align] === 'function')
      x = AlignStrategies[align]({
        x,
        offsetPercentage,
        spacingPercentage,
        currentSlideIndex,
        slidesCount
      })

    if (down) {
      const deltaPercentage = (xMov * 100) / (window.innerWidth / 1.2)
      x += deltaPercentage
    }

    let scale = down ? 1 - Math.abs(xMov) / (100 * 9) : 1
    scale = subScaleInactives && springIndex !== index.current ? scale * 0.9 : scale

    return { x, scale }
  }

  const [springs, setSprings] = useSprings(slides.length, calculateMovement({}))

  const bind = useDrag(({ down, movement: [xMov], direction: [xDir], cancel }) => {
    if (down && Math.abs(xMov) > window.innerWidth * 0.2) {
      cancel()
      index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, slides.length - 1)
      onIndexChange(index.current)
    }

    setSprings(calculateMovement({ down, xMov }))
  })

  const moveSlide = (newIndex) => {
    index.current = clamp(newIndex, 0, slides.length - 1)
    setSprings(calculateMovement({}))
    onIndexChange(index.current)
  }

  return (
    <div style={{ height, position: 'relative', touchAction: 'pan-y', overflow }}>
      {springs.map(({ x, scale }, springIndex) => (
        <ImageContainerDiv
          {...bind()}
          key={slides[springIndex].props.id}
          spacing={springIndex === slides.length - 1 ? 0 : spacing}
          slidewidth={slidewidth}
          style={{
            transform: to([x, scale], (t, s) => `translate3d(${t}%,0,0) scale(${s})`)
          }}>
          {slides[springIndex]}
        </ImageContainerDiv>
      ))}
    </div>
  )
}

SteppedSlider.propTypes = {
  children: PropTypes.node,
  activeIndex: PropTypes.number,
  onIndexChange: PropTypes.func,
  subScaleInactives: PropTypes.bool,
  spacing: PropTypes.number,
  overflow: PropTypes.string,
  height: PropTypes.string,
  slidewidth: PropTypes.number,
  align: PropTypes.string
}

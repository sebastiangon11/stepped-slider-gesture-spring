/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSprings, to } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import clamp from 'lodash-es/clamp'

import { ImageContainerDiv } from './SteppedSlider.styles'

export const SteppedSlider = ({
  children,
  activeIndex = 0,
  onIndexChange = () => {},
  subScaleInactives = false,
  spacing = 0,
  height = 100,
  slidewidth = 100,
  scaleFactor = 9,
  dragSensibility = 1.2
}) => {
  const childrenArray = React.Children.toArray(children)

  const index = useRef(0)
  const withPercentage = 100

  useEffect(() => {
    if (activeIndex !== index.current) moveSlide(activeIndex)
  }, [activeIndex])

  // Returns fitting styles for dragged/idle items
  const fn = ({ xMov = 0, down = false, distance = 0 } = {}) => (i) => {
    const deltaPercentage = (xMov * 100) / (window.innerWidth / dragSensibility)
    const x = (i - index.current) * withPercentage + (down ? deltaPercentage : 0)
    let scale = down ? 1 - distance / (withPercentage * scaleFactor) : 1
    // scale = subScaleInactives && i === index.current ? scale : scale * 0.9
    scale = subScaleInactives && i !== index.current ? scale * 0.9 : scale
    return { x, scale }
  }

  const [springs, setSprings] = useSprings(childrenArray.length, (i) => ({
    x: i * withPercentage,
    scale: subScaleInactives && i !== index.current ? 0.9 : 1
  }))

  const bind = useDrag(({ down, movement: [xMov], direction: [xDir], distance, cancel }) => {
    if (down && distance > window.innerWidth * 0.2) {
      cancel()
      index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, childrenArray.length - 1)
      onIndexChange(index.current)
    }

    setSprings(fn({ down, xMov, distance }))
  })

  const moveSlide = (newIndex) => {
    index.current = clamp(newIndex, 0, childrenArray.length - 1)
    setSprings(fn({}))
    onIndexChange(index.current)
  }

  return (
    <div style={{ height, position: 'relative', touchAction: 'pan-y' }}>
      {springs.map(({ x, scale }, i) => (
        <ImageContainerDiv
          {...bind()}
          key={childrenArray[i].props.id}
          spacing={spacing}
          slidewidth={slidewidth}
          style={{
            transform: to([x, scale], (t, s) => `translate3d(${t}%,0,0) scale(${s})`)
          }}>
          {childrenArray[i]}
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
  height: PropTypes.string,
  slidewidth: PropTypes.number,
  scaleFactor: PropTypes.number,
  dragSensibility: PropTypes.number
}

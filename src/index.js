import { render } from 'react-dom'
import React from 'react'
import { SteppedSlider } from './SteppedSlider/SteppedSlider'

import './styles.css'

const pages = [
  'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
]

const buildImage = (page) => (
  <img
    alt="some alt text"
    draggable={false}
    key={page}
    src={page}
    style={{
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      borderRadius: 16
    }}
  />
)

render(
  <SteppedSlider subScaleInactives spacing={0} height={100} slidewidth={75} scaleFactor={9} dragSensibility={1.2}>
    {pages.map(buildImage)}
  </SteppedSlider>,
  document.getElementById('root')
)

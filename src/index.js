import { render } from 'react-dom'
import React from 'react'
import { SteppedSlider } from './SteppedSlider/SteppedSlider'

import './styles.css'

const pages = [
  'https://images.deliveryhero.io/image/pedidosya-staging/banners/70e95d16-a1c5-4b28-b5d7-5a52e5e52722.jpg?quality=95&width=1032&height=360',
  'https://images.deliveryhero.io/image/pedidosya-staging/banners/271f316f-c27f-4cc2-95ff-e3acd3690749.jpg?quality=95&width=1032&height=360',
  'https://images.deliveryhero.io/image/pedidosya-staging/banners/cd699850-8b20-4f7b-b540-c93c9cc7d398.jpg?quality=95&width=1032&height=360',
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

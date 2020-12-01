import { render } from 'react-dom'
import React, { useState } from 'react'
import { SteppedSlider } from './SteppedSlider/SteppedSlider'

import './styles.css'

const slides = [
  'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
]

const buildImage = (slide) => (
  <img
    id={slide}
    alt="some alt text"
    draggable={false}
    key={slide}
    src={slide}
    style={{
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      borderRadius: 16
    }}
  />
)

const strategies = ['justify', 'center']

const App = () => {
  const [strategy, setStrategy] = useState(strategies[0])

  return (
    <div>
      <select onChange={(e) => setStrategy(e.target.value)} style={{ margin: '40px auto', display: 'flex' }}>
        {strategies.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <div style={{ margin: '0 10px', border: '1px dashed gray' }}>
        <SteppedSlider overflow="visible" spacing={0} height={150} slidewidth={75} align={strategy} subScaleInactives>
          {slides.map(buildImage)}
        </SteppedSlider>
      </div>
    </div>
  )
}

render(<App />, document.getElementById('root'))

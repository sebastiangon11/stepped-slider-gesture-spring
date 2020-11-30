const justify = ({ x, offsetPercentage, spacingPercentage, currentSlideIndex, slidesCount }) => {
  if (currentSlideIndex === slidesCount) {
    x += offsetPercentage - spacingPercentage
  } else if (currentSlideIndex > 0) {
    x += offsetPercentage / 2
  }
  return x
}

const center = ({ x, offsetPercentage, spacingPercentage, currentSlideIndex, slidesCount }) => {
  if (currentSlideIndex === slidesCount) {
    x += offsetPercentage / 2 - spacingPercentage / 2
  } else {
    x = x + offsetPercentage / 2
  }
  return x
}

export const AlignStrategies = { justify, center }

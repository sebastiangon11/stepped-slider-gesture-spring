import styled from 'styled-components'

import { animated } from 'react-spring'

export const ImageContainerDiv = styled(animated.div)`
  height: 100%;
  display: block;
  overflow: hidden;
  position: absolute;
  float: left;
  padding: ${(props) => `0px ${props.spacing}%`};
  width: ${(props) => `${props.slidewidth}%`};
  left: ${(props) => `${(100 - props.slidewidth) / 2}%`};
`

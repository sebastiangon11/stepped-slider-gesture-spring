import styled from 'styled-components'

import { animated } from 'react-spring'

export const ImageContainerDiv = styled(animated.div)`
  box-sizing: border-box;
  height: 100%;
  display: block;
  overflow: hidden;
  position: absolute;
  float: left;
  padding-right: ${(props) => `${props.spacing}%`};
  width: ${(props) => `${props.slidewidth}%`};
`

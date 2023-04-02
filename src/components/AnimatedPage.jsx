import { useTransition, animated, config } from 'react-spring'

function AnimatedPage({ children }) {
  const transitions = useTransition(children, {
    from: { opacity: 0.5 },
    enter: { opacity: 1 },
    // leave: { opacity: 1 },  
    config: { duration: 500, easing: t => t * t },
  })

  return transitions((props, item) => (
    <animated.div style={props}>
      {item}
    </animated.div>
  ))
}

export default AnimatedPage
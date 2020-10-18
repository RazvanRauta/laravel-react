/**
 *  @author: Razvan Rauta
 *  Date: Oct 18 2020
 *  Time: 13:44
 */

import { Box, CircularProgress } from '@material-ui/core'

import React from 'react'

const Loader = () => {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    function tick() {
      // reset when reaching 100%
      setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1))
    }

    const timer = setInterval(tick, 20)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Box display="flex" width={500} height={300}>
      <Box m="auto">
        <CircularProgress
          variant="determinate"
          value={progress}
          color="secondary"
        />
      </Box>
    </Box>
  )
}

export default Loader

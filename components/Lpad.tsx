import { lPadCoords, padHeight, padWidth } from '@/app/constants'
import { useGame } from '@/hooks/use-game'
import React from 'react'

const Lpad = () => {
  const { lPadCoordY } = useGame()
  return (
    <div
      style={{
        left: lPadCoords.x,
        bottom: lPadCoordY,
        width: padWidth,
        height: padHeight,
        backgroundColor: "black",
        position: "absolute",
      }}
    />
  )
}

export default Lpad
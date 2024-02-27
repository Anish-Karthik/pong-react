import { padHeight, padWidth, rPadCoords } from '@/app/constants'
import { useGame } from '@/hooks/use-game'
import React from 'react'

const Rpad = () => {
  const { rPadCoordY } = useGame()
  return (
    <div
      style={{
        left: rPadCoords.x,
        bottom: rPadCoordY,
        width: padWidth,
        height: padHeight,
        backgroundColor: "black",
        position: "absolute",
      }}
    />
  )
}

export default Rpad
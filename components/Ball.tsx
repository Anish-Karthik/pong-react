import { useGame } from "@/hooks/use-game";
import React from "react";

const Ball = () => {
  const { ballCoords } = useGame();
  console.log("HI");
  return (
    <div
      style={{
        left: ballCoords.x,
        bottom: ballCoords.y,
        width: 20,
        height: 20,
        backgroundColor: "black",
        position: "absolute",
        // transform: "translate(-50%, -50%)", // center the ball
        borderRadius: "50%",
      }}
    />
  );
};

export default Ball;

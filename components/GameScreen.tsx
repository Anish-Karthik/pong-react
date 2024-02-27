"use client";
import {
  canvasHeight,
  canvasWidth,
  lPadCoords,
  padHeight,
  padWidth,
  rPadCoords,
} from "@/app/constants";
import { useGame } from "@/hooks/use-game";
import React, { useEffect } from "react";
import Ball from "./Ball";

const GameScreen = () => {
  const state = useGame();
  useEffect(() => {
    if (state.isStarted) {
      state.setMovingBallInterval(20);
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        state.setIsStarted(true);
      }
      if (e.code === "Up" || e.code === "ArrowUp") {
        state.moveRPad(60);
      }
      if (e.code === "Down" || e.code === "ArrowDown") {
        state.moveRPad(-60);
      }
      if (e.code === "KeyW") {
        state.moveLPad(60);
      }
      if (e.code === "KeyS") {
        state.moveLPad(-60);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.onclick = () => {
      state.setIsStarted(true);
    };

    return () => {
      window.onclick = null;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.isStarted]);
  return (
    <main
      className={`border border-black mx-auto game relative`}
      style={{
        width: canvasWidth,
        height: canvasHeight,
      }}
    >
      <div
        style={{
          left: lPadCoords.x,
          bottom: state.lPadCoordY,
          width: padWidth,
          height: padHeight,
          backgroundColor: "black",
          position: "absolute",
        }}
      />
      <div className="flex w-full justify-between">
        <div>scoreP1: {state.scoreP1}</div>
        <div>scoreP2: {state.scoreP2}</div>
      </div>

      {/* ball */}
      <Ball />
      <div
        style={{
          left: rPadCoords.x,
          bottom: state.rPadCoordY,
          width: padWidth,
          height: padHeight,
          backgroundColor: "black",
          position: "absolute",
        }}
      />
    </main>
  );
};

export default GameScreen;

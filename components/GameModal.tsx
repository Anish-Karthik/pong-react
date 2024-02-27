"use client";
import { useGame } from "@/hooks/use-game";
import React from "react";

const GameModal = () => {
  const { isGameOver, isPaused, isStarted, winner } = useGame();
  if (!(isGameOver || isPaused || !isStarted)) return null
  return (
    <div className={"inset-0 absolute z-50 text-red-500 bg-black/50"}>
      {(
        <div
          className="top-[50%] absolute left-[50%] flex flex-col items-center gap-5 w-full"
          style={{
            transform: "translate(-50%, -50%)",
          }}
        >
          {isGameOver && <h1 className="text-4xl font-bold">{winner} wins</h1>}
          <h1 className="text-3xl font-bold">
            Click to {isGameOver ? "restart" : isPaused ? "Resume" : "start"}
          </h1>
        </div>
      )}
    </div>
  );
};

export default GameModal;

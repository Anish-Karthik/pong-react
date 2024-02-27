import { useGame } from "@/hooks/use-game";
import { useCallback, useEffect } from "react";

const GameLogic = () => {
  const {
    isStarted,
    resetGame,
    toggleIsPaused,
    toggleIsStarted,
    isGameOver,
    moveRPad,
    moveLPad,
  } = useGame();
  const handleGameControl = useCallback(() => {
    if (isGameOver) {
      resetGame();
    } else if (isStarted) {
      toggleIsPaused();
    } else {
      console.log("Starting");
      toggleIsStarted();
    }
  }, [isGameOver, isStarted, resetGame, toggleIsPaused, toggleIsStarted]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Up" || e.code === "ArrowUp") {
        moveRPad(60);
      }
      if (e.code === "Down" || e.code === "ArrowDown") {
        moveRPad(-60);
      }
      if (e.code === "KeyW") {
        moveLPad(60);
      }
      if (e.code === "KeyS") {
        moveLPad(-60);
      }
      if (e.code === "Space" || e.code === "Enter") {
        handleGameControl();
      }
    };
    window.onclick = () => {
      handleGameControl();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.onclick = null;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleGameControl, isStarted, moveLPad, moveRPad]);
  return null;
};

export default GameLogic;

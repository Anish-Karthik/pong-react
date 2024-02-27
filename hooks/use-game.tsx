import {
  ballCoords,
  ballRadius,
  ballSpeed,
  canvasHeight,
  canvasWidth,
  lPadCoords,
  maxSpeedX,
  maxSpeedY,
  padHeight,
  padWidth,
  rPadCoords,
} from "@/app/constants";
import { create } from "zustand";

type GameState = {
  isStarted: boolean;
  scoreP1: number;
  scoreP2: number;
  ballSpeed: { x: number; y: number };
  lPadCoordY: number;
  rPadCoordY: number;
  ballCoords: { x: number; y: number };
  setIsStarted: (isStarted: boolean) => void;
  setScoreP1: (score: number) => void;
  setScoreP2: (score: number) => void;
  moveLPad: (y: number) => void;
  moveRPad: (y: number) => void;
  moveBall: () => void;
  movingBallInterval: NodeJS.Timeout | null;
  setMovingBallInterval: (time: number) => void;
  clearMovingBallInterval: () => void;
};

export const useGame = create<GameState>((set, get) => ({
  isStarted: false,
  ballSpeed: ballSpeed,
  scoreP1: 0,
  scoreP2: 0,
  lPadCoordY: lPadCoords.y,
  rPadCoordY: rPadCoords.y,
  ballCoords,
  clearMovingBallInterval: () => {
    set((state) => {
      if (state.movingBallInterval) {
        clearInterval(state.movingBallInterval);
      }
      return { movingBallInterval: null };
    });
  },
  setIsStarted: (isStarted) => set({ isStarted }),
  setScoreP1: (n) => set({ scoreP1: n }),
  setScoreP2: (n) => set({ scoreP2: n }),
  moveLPad: (dy) => {
    set((state) => {
      const newY = state.lPadCoordY + dy;
      if (newY == state.lPadCoordY) {
        return state;
      }
      return {
        lPadCoordY: Math.min(canvasHeight - padHeight, Math.max(0, newY)),
      };
    });
  },
  moveRPad: (dy) => {
    set((state) => {
      const newY = state.rPadCoordY + dy;
      if (newY == state.rPadCoordY) {
        return state;
      }
      return {
        rPadCoordY: Math.min(canvasHeight - padHeight, Math.max(0, newY)),
      };
    });
  },

  moveBall: () =>
    set((state) => {
      console.log(state.ballCoords, state.ballSpeed);
      const newX = state.ballCoords.x + state.ballSpeed.x;
      const newY = state.ballCoords.y + state.ballSpeed.y;
      if (
        newY + ballRadius <= 0 ||
        newY - ballRadius >= canvasHeight - ballRadius * 2
      ) {
        console.log("hi", newY - ballRadius * 2 <= 0);
        return {
          ballCoords: { x: newX, y: state.ballCoords.y - state.ballSpeed.y },
          ballSpeed: {
            x: state.ballSpeed.x,
            y: -state.ballSpeed.y,
          },
        };
      }
      // if hits lpad
      console.log(newX, newY, state.lPadCoordY, state.lPadCoordY + padHeight);
      console.log(
        newY >= state.lPadCoordY,
        newY <= state.lPadCoordY + padHeight,
        newX - ballRadius * 2 <= padWidth
      );
      if (
        (newY >= state.lPadCoordY &&
          newY <= state.lPadCoordY + padHeight &&
          newX <= padWidth) ||
        (newY >= state.rPadCoordY &&
          newY <= state.rPadCoordY + padHeight &&
          newX + ballRadius * 2 >= canvasWidth - padWidth)
      ) {
        console.log("hi");
        return {
          ballCoords: { x: newX, y: newY },
          ballSpeed: {
            x: Math.abs(state.ballSpeed.x * 1.3) > maxSpeedX? -state.ballSpeed.x : -state.ballSpeed.x * 1.3,
            y: Math.abs(state.ballSpeed.y * 1.1) > maxSpeedY? state.ballSpeed.y : state.ballSpeed.y * 1.1,
          },
        };
      } else if (newX + ballRadius <= 0) {
        state.setScoreP2(state.scoreP2 + 1);
        return {
          ballCoords: ballCoords,
          ballSpeed: {
            y: (Math.floor(Math.random() * 100) % 2 ? 1 : -1) * ballSpeed.x,
            x: ballSpeed.x,
          },
        };
      } else if (newX >= canvasWidth - ballRadius) {
        state.setScoreP1(state.scoreP1 + 1);
        return {
          ballCoords: ballCoords,
          ballSpeed: {
            y: (Math.floor(Math.random() * 100) % 2 ? 1 : -1) * ballSpeed.x,
            x: -ballSpeed.x,
          },
        };
      }
      return { ballCoords: { x: newX, y: newY } };
    }),
  movingBallInterval: null,
  setMovingBallInterval: (time) => {
    if (get().movingBallInterval && get().isStarted) {
      return;
    }
    set((state) => ({
      movingBallInterval: state.isStarted? setInterval(() => {
        console.log("hi");
        state.moveBall();
      }, time): null,
    }));
  },
}));

import {
  ballCoords,
  ballRadius,
  ballSpeed,
  canvasHeight,
  canvasWidth,
  initialState,
  lPadCoords,
  maxSpeedX,
  maxSpeedY,
  padHeight,
  padWidth,
  rPadCoords,
  winningScore,
} from "@/app/constants";
import { create } from "zustand";
type GameState = {
  winner: "Player1" | "Player2" | null;
  isStarted: boolean;
  isGameOver: boolean;
  isPaused: boolean;
  scoreP1: number;
  scoreP2: number;
  ballSpeed: { x: number; y: number };
  lPadCoordY: number;
  rPadCoordY: number;
  ballCoords: { x: number; y: number };
  movingBallInterval: NodeJS.Timeout | null;
};

type useGameState = GameState & {
  resetGame: () => void;
  toggleIsStarted: () => void;
  toggleIsGameOver: () => void;
  toggleIsPaused: () => void;
  setScoreP1: (score: number) => void;
  setScoreP2: (score: number) => void;
  moveLPad: (y: number) => void;
  moveRPad: (y: number) => void;
  moveBall: () => void;
  setWinner: (winner: "Player1" | "Player2" | null) => void;
  setMovingBallInterval: (time: number) => void;
  clearMovingBallInterval: () => void;
};

export const useGame = create<useGameState>((set, get) => ({
  ...initialState,
  resetGame: () => set(initialState),
  toggleIsGameOver: () =>
    set((state) => {
      if (state.isGameOver) {
        state.clearMovingBallInterval();
        return { isGameOver: !state.isGameOver };
      }
      return { isGameOver: !state.isGameOver };
    }),
  toggleIsStarted: () =>{
    set((state) => {
      if (!state.isStarted) {
      } else {
        state.clearMovingBallInterval();
      }
      return { isStarted: !state.isStarted };
    }),
    get().setMovingBallInterval(20)
  },
  toggleIsPaused: () =>
    set((state) => {
      if (state.isPaused && !state.movingBallInterval) {
        state.setMovingBallInterval(20);
      } else {
        state.clearMovingBallInterval();
      }
      return { isPaused: !state.isPaused };
    }),
  setWinner: (winner) =>
    set((state) => {
      console.log(winner, state.scoreP1, state.scoreP2);
      state.clearMovingBallInterval();
      return { winner, isGameOver: true };
    }),
  clearMovingBallInterval: () => {
    set((state) => {
      if (state.movingBallInterval) {
        clearInterval(state.movingBallInterval);
      }
      return { movingBallInterval: null };
    });
  },
  setScoreP1: (scoreP1) =>
    set((state) => {
      if (scoreP1 >= winningScore) {
        console.log("hi");
        state.setWinner("Player1");
      }
      return { scoreP1 };
    }),
  setScoreP2: (scoreP2) =>
    set((state) => {
      if (scoreP2 >= winningScore) {
        console.log("hi");
        state.setWinner("Player2");
      }
      return { scoreP2 };
    }),
  moveLPad: (dy) => {
    set((state) => {
      if (!state.isStarted || state.isPaused || state.isGameOver) {
        return state;
      }
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
      if (!state.isStarted || state.isPaused || state.isGameOver) {
        return state;
      }
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
            x:
              Math.abs(state.ballSpeed.x * 1.3) > maxSpeedX
                ? -state.ballSpeed.x
                : -state.ballSpeed.x * 1.3,
            y:
              Math.abs(state.ballSpeed.y * 1.1) > maxSpeedY
                ? state.ballSpeed.y
                : state.ballSpeed.y * 1.1,
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
      movingBallInterval: state.isStarted
        ? setInterval(() => {
            console.log("hi");
            state.moveBall();
          }, time)
        : null,
    }));
  },
}));

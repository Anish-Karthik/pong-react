export const ballRadius = 10;
export const padWidth = 10;
export const padHeight = 100;
export const canvasWidth = 800;
export const canvasHeight = 600;
export const ballSpeed = { x: 5, y: 3 };
export const lPadCoords = { x: 0, y: canvasHeight / 2 - padHeight / 2 - 1 };
export const rPadCoords = {
  x: canvasWidth - padWidth - 1,
  y: canvasHeight / 2 - padHeight / 2 - 1,
};
export const ballCoords = {
  x: canvasWidth / 2 - ballRadius,
  y: canvasHeight / 2 - ballRadius,
};

export const maxSpeedX = 8 * 1.3;
export const maxSpeedY = 8 * 1.1;

export const winningScore = 5;

export const initialState = {
  winner: null,
  isStarted: false,
  isPaused: false,
  isGameOver: false,
  ballSpeed: ballSpeed,
  scoreP1: 0,
  scoreP2: 0,
  lPadCoordY: lPadCoords.y,
  rPadCoordY: rPadCoords.y,
  ballCoords,
};

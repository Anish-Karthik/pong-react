"use client";
import { canvasHeight, canvasWidth } from "@/app/constants";
import Ball from "./Ball";
import Lpad from "./Lpad";
import Rpad from "./Rpad";
import Score from "./Score";
import GameLogic from "./GameLogic";
import GameModal from "./GameModal";

const GameScreen = () => {
  return (
    <main
      className={`border border-black mx-auto game relative overflow-hidden game`}
      style={{
        width: canvasWidth,
        height: canvasHeight,
      }}
    >
      <GameModal />
      <GameLogic />
      <Score />
      <Lpad />
      <Ball />
      <Rpad />
    </main>
  );
};

export default GameScreen;

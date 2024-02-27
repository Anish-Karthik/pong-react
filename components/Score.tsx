import { useGame } from "@/hooks/use-game";

const Score = () => {
  const { scoreP1, scoreP2 } = useGame();
  console.log(`Score: ${scoreP1} ${scoreP2}`);

  return (
    <div className="flex w-full justify-between">
      <div>scoreP1: {scoreP1}</div>
      <div>scoreP2: {scoreP2}</div>
    </div>
  );
};

export default Score;

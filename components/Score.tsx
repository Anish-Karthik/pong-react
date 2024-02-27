import { useGame } from "@/hooks/use-game";

const Score = () => {
  const { scoreP1, scoreP2 } = useGame();
  console.log(`Score: ${scoreP1} ${scoreP2}`);

  return (
    <div className="flex w-full justify-between">
      <div className="text-lg font-semibold px-2 py-2">P1 Score: {scoreP1}</div>
      <div className="text-lg font-semibold px-2 py-2">P2 Score: {scoreP2}</div>
    </div>
  );
};

export default Score;

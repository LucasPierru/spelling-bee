type ScoreIndicatorProps = {
  currentScore: number;
  totalPossibleScore: number;
  currentLevel: string;
  level: { name: string; value: number };
  nextLevel: { name: string; value: number };
};

const ScoreIndicator = ({ currentScore, totalPossibleScore, currentLevel, level, nextLevel }: ScoreIndicatorProps) => {
  return (
    <div
      className={`transition-[width] duration-300 ease-in-out flex justify-center items-center text-black font-semibold ${
        currentScore >= Math.round(totalPossibleScore * level.value) ? "bg-yellow-400" : "bg-gray-300"
      } rounded-full aspect-square ${
        currentLevel === level.name ? "w-7 text-sm sm:w-10 sm:text-base" : "w-6 text-xs sm:w-7 sm:text-sm"
      } not-first:before:w-1/8 before:h-2 before:absolute before:-translate-x-1/2 before:-z-10 ${
        currentScore >= Math.round(totalPossibleScore * level.value) ? "before:bg-yellow-400" : "before:bg-gray-300"
      }`}>
      {currentScore > Math.round(totalPossibleScore * level.value) &&
      currentScore < Math.round(totalPossibleScore * (nextLevel ? nextLevel.value : 1))
        ? currentScore
        : Math.round(totalPossibleScore * level.value)}
    </div>
  );
};

export default ScoreIndicator;

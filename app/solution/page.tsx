import { calculateWordScore, getWordsByLetters, isWordPangram } from "@/lib/words";
import { getYesterdaysLetters } from "@/actions/add-daily-letters";
import dayjs from "dayjs";
import { getTodayDate } from "@/lib/utils";
dayjs().format();

export default async function SolutionPage() {
  const date = getTodayDate(-1);
  const {
    data: { letters, centerLetter },
  } = await getYesterdaysLetters(date);

  const validWords = getWordsByLetters(letters);

  const totalPossibleScore = Array.from(validWords).reduce((acc, word) => acc + calculateWordScore(word, letters), 0);

  return (
    <div className="flex flex-col items-center max-w-5xl h-[calc(100vh-5rem)] mx-auto p-4 gap-4">
      <h1 className="text-4xl font-bold mb-2">Word Hive, Solutions {dayjs(date).format("MMMM D, YYYY")}</h1>
      <span className="text-left text-lg block mb-1">
        {letters.map((letter: string, index: number) => (
          <span key={letter} className={letter === centerLetter ? "font-bold" : ""}>
            {letter.toUpperCase()}
            {index === 6 ? "" : "-"}
          </span>
        ))}
        ,&nbsp; {validWords.size} possible words, {totalPossibleScore} total points
      </span>
      <div className="grid grid-cols-6 max-w-7xl items-center gap-4">
        {Array.from(validWords).map((word, index) => (
          <div
            key={index}
            className={`text-lg mx-2 font-semibold border-b border-border py-2 w-fit pr-1 ${
              isWordPangram(word, letters) ? "text-yellow-400" : ""
            }`}>
            {word} - {calculateWordScore(word, letters)}
          </div>
        ))}
      </div>
    </div>
  );
}

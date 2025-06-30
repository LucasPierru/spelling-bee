import WordForm from "@/components/word-form/word-form";
import { calculateWordScore, getWordsByLetters, scrambleLetters } from "@/lib/words";
import { addDailyLetters } from "../actions/add-daily-letters";

export default async function Home() {
  const {
    data: { letters, centerLetter },
  } = await addDailyLetters();

  const validWords = getWordsByLetters(letters);
  const scrambledLetters = scrambleLetters(letters);

  const totalPossibleScore = Array.from(validWords).reduce((acc, word) => acc + calculateWordScore(word, letters), 0);

  return (
    <div className="flex flex-col items-center max-w-5xl h-[calc(100vh-5rem)] mx-auto p-4 md:py-56">
      <h1 className="text-4xl font-bold mb-6">Word Hive</h1>
      <WordForm
        letters={scrambledLetters}
        centerLetter={centerLetter}
        validWords={validWords}
        totalPossibleScore={totalPossibleScore}
      />
    </div>
  );
}

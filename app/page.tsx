import WordForm from "@/components/word-form/word-form";
import { calculateWordScore, generateLetterSet, getWordsByLetters, scrambleLetters } from "@/lib/words";

export default function Home() {
  const letters = scrambleLetters(generateLetterSet());
  const validWords = getWordsByLetters(letters);

  const totalPossibleScore = Array.from(validWords).reduce((acc, word) => acc + calculateWordScore(word, letters), 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Word Hive</h1>
      <WordForm letters={letters} validWords={validWords} totalPossibleScore={totalPossibleScore} />
    </div>
  );
}

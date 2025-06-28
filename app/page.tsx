import WordForm from "@/components/word-form/word-form";
import {
  calculateWordScore,
  generateLetterSet,
  getAllPotentialPangrams,
  getWordsByLetters,
  scrambleLetters,
} from "@/lib/words";

export default function Home() {
  const letters = scrambleLetters(generateLetterSet());
  const validWords = getWordsByLetters(letters);

  const totalPossibleScore = Array.from(validWords).reduce((acc, word) => acc + calculateWordScore(word, letters), 0);
  const pangrams = getAllPotentialPangrams(Array.from(validWords));

  console.log("Pangrams:", pangrams);

  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto py-56">
      <h1 className="text-4xl font-bold mb-6">Word Hive</h1>
      <WordForm letters={letters} validWords={validWords} totalPossibleScore={totalPossibleScore} />
    </div>
  );
}

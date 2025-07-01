import { calculateWordScore, getWordsByLetters, isWordPangram } from "@/lib/words";
import { addDailyLetters } from "@/actions/add-daily-letters";
import dayjs from "dayjs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
dayjs().format();

export default async function HintsPage() {
  const {
    data: { letters, centerLetter, date },
  } = await addDailyLetters();

  const validWords = getWordsByLetters(letters);
  const totalPossibleScore = Array.from(validWords).reduce((acc, word) => acc + calculateWordScore(word, letters), 0);
  const pangrams = Array.from(validWords).filter((word) => isWordPangram(word, letters));

  const getMaxWordLength = (): number => {
    return Array.from(validWords).reduce((max, word) => Math.max(max, word.length), 0);
  };

  const maxWordLength = getMaxWordLength();

  const createLetterGrid = (): Map<string, number[]> => {
    const grid: Map<string, number[]> = new Map();

    for (const letter of letters) {
      grid.set(letter, Array(maxWordLength - 3).fill(0));
    }

    for (const word of validWords) {
      const letterArray = grid.get(word[0]) || [];
      letterArray[word.length - 4] += 1;
      grid.set(word[0], letterArray); // Ensure the first letter of each word is in the grid
    }

    return grid;
  };

  const hintGrid = createLetterGrid();

  return (
    <div className="flex flex-col items-center max-w-5xl h-[calc(100vh-5rem)] mx-auto p-4 gap-4">
      <h1 className="text-4xl font-bold mb-2">Word Hive, Hints for {dayjs(date).format("MMMM D, YYYY")}</h1>
      <span className="text-left text-lg block mb-1">
        {letters.map((letter: string, index: number) => (
          <span key={letter} className={letter === centerLetter ? "font-bold" : ""}>
            {letter.toUpperCase()}
            {index === 6 ? "" : "-"}
          </span>
        ))}
        ,&nbsp; {validWords.size} possible words, {pangrams.length} pangrams, {totalPossibleScore} total points
      </span>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl font-bold">Letter</TableHead>
            {Array.from({ length: maxWordLength - 3 }, (_, i) => (
              <TableHead key={i} className="text-center text-xl font-bold">
                {i + 4}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from(hintGrid.entries()).map(([letter, counts]) => (
            <TableRow key={letter}>
              <TableCell className="text-xl font-bold">{letter.toUpperCase()}</TableCell>
              {counts.map((count, index) => (
                <TableCell key={index} className="text-center text-xl">
                  {count}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <span>
        This grid gives you the starting letter of each word and the number of times it appears in the valid words list.
      </span>
    </div>
  );
}

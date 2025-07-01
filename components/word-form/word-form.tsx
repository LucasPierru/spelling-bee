"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import LetterCard from "../letter-card/letter-card";
import { Input } from "../ui/input";
import { calculateWordScore, capitalizeFirstLetter, isWordPangram } from "@/lib/words";
import toast, { Toaster } from "react-hot-toast";
import { getTodayDate } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import ScoreIndicator from "../score-indicator/score-indicator";

type WordFormProps = {
  letters: string[];
  centerLetter: string;
  validWords: Set<string>;
  totalPossibleScore: number;
};

export default function WordForm({ letters, centerLetter, validWords, totalPossibleScore }: WordFormProps) {
  const [guesses, setGuesses] = useState<Map<string, number>>(new Map());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const levels = [
    { name: "start", value: 0 },
    { name: "beginner", value: 0.1 },
    { name: "intermediate", value: 0.2 },
    { name: "advanced", value: 0.3 },
    { name: "expert", value: 0.4 },
    { name: "master", value: 0.5 },
    { name: "grandmaster", value: 0.6 },
    { name: "legend", value: 0.7 },
  ];
  const date = getTodayDate();

  useEffect(() => {
    const storedGuesses = localStorage.getItem(date);
    if (storedGuesses) {
      setGuesses(new Map(JSON.parse(storedGuesses)));
    }
    setIsLoading(false);
  }, [date]);

  const guessWord = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      const value = event.currentTarget.value.toLowerCase();
      if (guesses.has(value)) {
        event.currentTarget.value = "";
        toast.error("Word already guessed");
        return;
      }
      if (validWords.has(value)) {
        const isPangram = isWordPangram(value, letters);
        const score = calculateWordScore(value, letters);
        if (isPangram) {
          toast(`Found a pangram! +${score}`, {
            style: {
              background: "#FDC601",
              fontWeight: "semi-bold",
            },
          });
        } else {
          toast(`Good guess! +${score}`, {
            style: {
              background: "#FDC601",
              fontWeight: "semi-bold",
            },
          });
        }
        localStorage.setItem(date, JSON.stringify(Array.from(guesses).concat([[value, score]])));
        setGuesses((prev) => new Map(prev).set(value, score));
        event.currentTarget.value = "";
      }
    }
  };

  const getTotalScore = (): number => {
    return Array.from(guesses.values()).reduce((acc, score) => acc + score, 0);
  };

  const getCurrentLevel = (): string => {
    const score = getTotalScore();
    const reversedLevels = [...levels].reverse();
    const currentLevel = reversedLevels.find((level) => score >= Math.round(totalPossibleScore * level.value));
    return currentLevel ? currentLevel.name : "unknown";
  };

  const totalScore = getTotalScore();
  const currentLevel = getCurrentLevel();

  const nonCentralLetters = letters.filter((letter) => letter !== centerLetter);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoaderCircle className="animate-spin w-16 h-16" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between gap-6">
      <Input onKeyDown={guessWord} className="!text-lg" />
      <div className="flex flex-wrap justify-center gap-4">
        {nonCentralLetters.slice(0, 3).map((letter, index) => (
          <LetterCard key={index} letter={letter} isCentral={false} />
        ))}
        <LetterCard letter={centerLetter} isCentral={true} />
        {nonCentralLetters.slice(3, 6).map((letter, index) => (
          <LetterCard key={index} letter={letter} isCentral={false} />
        ))}
      </div>
      <div className="relative flex justify-between items-center min-h-10">
        {levels.map((level, index) => (
          <ScoreIndicator
            key={index}
            currentScore={totalScore}
            totalPossibleScore={totalPossibleScore}
            currentLevel={currentLevel}
            level={level}
            nextLevel={levels[index + 1]}
          />
        ))}
      </div>
      <div className="flex flex-col flex-wrap gap-2 max-h-60 overflow-y-auto">
        {Array.from(guesses).map(([guess], index) => (
          <div key={index} className="text-lg mx-2 font-semibold border-b border-border py-2 w-fit pr-1">
            {capitalizeFirstLetter(guess)}
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
}

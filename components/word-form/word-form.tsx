"use client";

import { KeyboardEvent, useState } from "react";
import LetterCard from "../letter-card/letter-card";
import { Input } from "../ui/input";
import { calculateWordScore, capitalizeFirstLetter } from "@/lib/words";

export default function WordForm({
  letters,
  validWords,
  totalPossibleScore,
}: {
  letters: string[];
  validWords: Set<string>;
  totalPossibleScore: number;
}) {
  const [guesses, setGuesses] = useState<Map<string, number>>(new Map());
  const levels = [
    { name: "beginner", value: 0.1 },
    { name: "intermediate", value: 0.2 },
    { name: "advanced", value: 0.3 },
    { name: "expert", value: 0.4 },
    { name: "master", value: 0.5 },
    { name: "grandmaster", value: 0.6 },
    { name: "legend", value: 0.7 },
  ];

  console.log("Generated letters:", letters);
  console.log("Valid words:", validWords);

  const guessWord = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      const value = event.currentTarget.value.toLowerCase();
      if (guesses.has(value)) {
        console.warn("Word already guessed:", value);
        event.currentTarget.value = "";
        return;
      }
      if (validWords.has(value)) {
        const score = calculateWordScore(value, letters);
        setGuesses((prev) => new Map(prev).set(value, score));
        event.currentTarget.value = "";
      }
    }
  };

  const getTotalScore = (): number => {
    return Array.from(guesses.values()).reduce((acc, score) => acc + score, 0);
  };

  const testList: [string, number][] = [
    ["apple", 10],
    ["banana", 5],
    ["cherry", 8],
    ["date", 4],
    ["elderberry", 12],
    ["fig", 3],
    ["grape", 6],
    ["honeydew", 9],
    ["kiwi", 7],
    ["lemon", 4],
    ["mango", 5],
    ["nectarine", 11],
    ["orange", 6],
    ["papaya", 8],
    ["quince", 10],
    ["raspberry", 12],
    ["strawberry", 14],
    ["tangerine", 9],
    ["ugli", 11],
    ["vanilla", 15],
  ];

  const getCurrentLevel = (): string => {
    const score = getTotalScore();
    const reversedLevels = [...levels].reverse();
    const currentLevel = reversedLevels.find((level) => score >= Math.round(totalPossibleScore * level.value));
    return currentLevel ? currentLevel.name : "unknown";
  };

  const totalScore = getTotalScore();
  const currentLevel = getCurrentLevel();

  return (
    <div className="flex flex-col gap-6">
      <Input onKeyDown={guessWord} />
      <div className="flex flex-wrap justify-center gap-4">
        {letters.map((letter, index) => (
          <LetterCard
            key={index}
            letter={letter}
            isCentral={index === 0} // Assuming the first letter is the central one
          />
        ))}
      </div>
      <div className="relative flex justify-between items-center">
        {levels.map((level, index) => (
          <div
            key={index}
            className={`flex justify-center items-center text-sm text-black font-semibold ${
              totalScore > Math.round(totalPossibleScore * level.value) ? "bg-yellow-400" : "bg-gray-300"
            } rounded-full aspect-square ${
              currentLevel === level.name ? "w-8 text-sm" : "w-6 h-6 text-xs"
            } not-first:before:w-16 before:h-2 before:absolute before:-translate-x-4/6 before:-z-10 ${
              totalScore > Math.round(totalPossibleScore * level.value) ? "before:bg-yellow-400" : "before:bg-gray-300"
            }`}>
            {Math.round(totalPossibleScore * level.value)}
          </div>
        ))}
      </div>
      <div className="flex flex-col flex-wrap gap-2 max-h-60 overflow-y-auto">
        {testList.map(([guess], index) => (
          <div key={index} className="text-lg mx-2 font-semibold border-b border-border py-2">
            {capitalizeFirstLetter(guess)}
            {/*  - {score} */}
          </div>
        ))}
      </div>
    </div>
  );
}

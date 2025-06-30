"use client";

import { KeyboardEvent, useState } from "react";
import LetterCard from "../letter-card/letter-card";
import { Input } from "../ui/input";
import { calculateWordScore, capitalizeFirstLetter, isWordPangram } from "@/lib/words";
import toast, { Toaster } from "react-hot-toast";

export default function WordForm({
  letters,
  centerLetter,
  validWords,
  totalPossibleScore,
}: {
  letters: string[];
  centerLetter: string;
  validWords: Set<string>;
  totalPossibleScore: number;
}) {
  const [guesses, setGuesses] = useState<Map<string, number>>(new Map());
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

  /* console.log("Generated letters:", letters);
  console.log("Valid words:", validWords); */

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

  console.log({ validWords });

  const nonCentralLetters = letters.filter((letter) => letter !== centerLetter);

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
          <div
            key={index}
            className={`transition-[width] duration-300 ease-in-out flex justify-center items-center text-black font-semibold ${
              totalScore >= Math.round(totalPossibleScore * level.value) ? "bg-yellow-400" : "bg-gray-300"
            } rounded-full aspect-square ${
              currentLevel === level.name ? "w-7 text-sm sm:w-10 sm:text-base" : "w-6 text-xs sm:w-7 sm:text-sm"
            } not-first:before:w-1/8 before:h-2 before:absolute before:-translate-x-1/2 before:-z-10 ${
              totalScore >= Math.round(totalPossibleScore * level.value) ? "before:bg-yellow-400" : "before:bg-gray-300"
            }`}>
            {totalScore > Math.round(totalPossibleScore * level.value) &&
            totalScore < Math.round(totalPossibleScore * (levels[index + 1] ? levels[index + 1].value : 1))
              ? totalScore
              : Math.round(totalPossibleScore * level.value)}
          </div>
        ))}
      </div>
      <div className="flex flex-col flex-wrap gap-2 max-h-60 overflow-y-auto">
        {Array.from(guesses).map(([guess], index) => (
          <div key={index} className="text-lg mx-2 font-semibold border-b border-border py-2 w-fit pr-1">
            {capitalizeFirstLetter(guess)}
            {/*  - {score} */}
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
}

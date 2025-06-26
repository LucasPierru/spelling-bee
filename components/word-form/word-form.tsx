"use client";

import { KeyboardEvent, useState } from "react";
import LetterCard from "../letter-card/letter-card";
import { Input } from "../ui/input";
import { calculateWordScore, capitalizeFirstLetter } from "@/lib/words";

export default function WordForm({ letters, validWords }: { letters: string[]; validWords: Set<string> }) {
  const [guesses, setGuesses] = useState<Map<string, number>>(new Map());

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

  return (
    <div className="flex flex-col gap-4">
      <Input onKeyDown={guessWord} />
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {letters.map((letter, index) => (
          <LetterCard
            key={index}
            letter={letter}
            isCentral={index === 0} // Assuming the first letter is the central one
          />
        ))}
      </div>
      <div>
        {Array.from(guesses).map(([guess, score], index) => (
          <div key={index} className="text-lg font-semibold text-green-600">
            {capitalizeFirstLetter(guess)} - {score}
          </div>
        ))}
      </div>
    </div>
  );
}

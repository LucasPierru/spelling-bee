import React from "react";

type LetterCardProps = {
  letter: string;
  isCentral?: boolean;
  addLetter: (letter: string) => void;
};

export default function LetterCard({ letter, isCentral, addLetter }: LetterCardProps) {
  return (
    <button
      type="button"
      className={`${isCentral ? "bg-yellow-400" : "bg-gray-300 "} text-black font-semibold p-4 min-w-12 text-center`}
      onClick={() => addLetter(letter)}>
      {letter.toUpperCase()}
    </button>
  );
}

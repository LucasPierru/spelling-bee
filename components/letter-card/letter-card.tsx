import React from "react";

type LetterCardProps = {
  letter: string;
  isCentral?: boolean;
};

export default function LetterCard({ letter, isCentral }: LetterCardProps) {
  return (
    <div className={`${isCentral ? "bg-yellow-400" : "bg-gray-300 "} text-black font-semibold p-4`}>
      {letter.toUpperCase()}
    </div>
  );
}

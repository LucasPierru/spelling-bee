import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shuffleArray(array: string[]): string[] {
  // Create a shallow copy to avoid modifying the original array
  const shuffledArray = [...array];
  let currentIndex = shuffledArray.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }

  return shuffledArray;
}

export function selectMultipleRandomElements(array: string[], count: number): string[] {
  if (count > array.length || count < 0) {
    console.warn("Count requested exceeds array length or is negative. Returning all elements if count > length, or an empty array if count < 0.");
    return count > array.length ? [...array] : [];
  }

  const shuffled = shuffleArray(array);
  return shuffled.slice(0, count);
}

export const getTodayDate = (): string => {
  const now = new Date();
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`; // Format: YYYY-MM-DD (local timezone)
  return date;
};

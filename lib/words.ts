import wordList from "../data/word.json";

export const words: string[] = wordList.filter(key => key.length >= 4);

export const generateLetterSet = (): string[] => {
  const potentialPangrams = getAllPotentialPangrams(words);
  const randomWord = potentialPangrams[Math.floor(Math.random() * potentialPangrams.length)];
  return Array.from(new Set(randomWord));
};

export const hasSevenUniqueLetters = (word: string): boolean => {
  const cleaned = word.toLowerCase()
  const uniqueLetters = new Set(cleaned);
  return uniqueLetters.size === 7;
}

export const getAllPotentialPangrams = (words: string[]): string[] => {
  return words.filter(word => hasSevenUniqueLetters(word));
};

export const getWordsByLetters = (letters: string[]): Set<string> => {
  const letterSet = new Set(letters);
  const requiredLetter = letters[0];
  return new Set(words.filter(word => {
    const wordLetters = new Set(word);
    return word.includes(requiredLetter) && [...wordLetters].every(letter => letterSet.has(letter));
  }));
};

export const isWordPangram = (word: string, letters: string[]): boolean => {
  const letterSet = new Set(letters);
  for (const letter of word) {
    if (letterSet.has(letter)) {
      letterSet.delete(letter);
    }
  }
  if (letterSet.size === 0) {
    return true;
  }
  return false;
};

export const calculateWordScore = (word: string, letters: string[]): number => {
  if (word.length === 4) return 1;
  if (isWordPangram(word, letters)) return word.length + 7;
  else return word.length;
}

export const scrambleLetters = (letters: string[]): string[] => {
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters;
}

export const capitalizeFirstLetter = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

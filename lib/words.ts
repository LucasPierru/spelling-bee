export const words: string[] = ["bake", "coal", "door", "farm", "gate", "hope", "iron", "joke", "kite", "lamp",
  "mint", "nest", "oven", "pink", "quiz", "rope", "salt", "tent", "urge", "vast",
  "wolf", "xray", "yarn", "zero", "ally", "bush", "clap", "dusk", "envy", "flux",
  "apple", "brave", "cabin", "daisy", "eagle", "flute", "grape", "honey", "ivory", "jelly",
  "karma", "lemon", "mango", "noble", "onion", "pearl", "quiet", "river", "scale", "tiger",
  "umbra", "vivid", "witty", "xenon", "young", "zebra", "blink", "crisp", "dream", "equip",
  "banana", "castle", "danger", "effort", "forest", "garage", "hammer", "income", "jungle", "kitten",
  "legend", "magnet", "native", "orange", "palace", "quartz", "rescue", "silent", "ticket", "unfold",
  "violet", "wander", "yellow", "zealot", "admire", "bridge", "circle", "debate", "empire", "fabric",
  "balloon", "candles", "diamond", "economy", "freight", "glacier", "harvest", "isolate", "journey", "kingdom",
  "lawyers", "monster", "notable", "optimum", "picture", "quicken", "railway", "satisfy", "tension", "unicorn",
  "vulture", "warrior", "xeroxed", "yearnly", "zephyrs", "activity", "backpack", "campaign", "delivery", "election", "function", "generate", "hospital", "industry", "judgment",
  "kneeling", "language", "medicine", "narrator", "observer", "painting", "quantity", "reliable", "scenario", "training",
  "apartment", "basketball", "classroom", "democracy", "equipment", "foundation", "greenhouse", "horseback", "invisible", "jewellery",
  "kilometer", "landscape", "motorbike", "newspaper", "overthrow", "population", "quickness", "reluctant", "structure", "technology"
];

export const generateLetterSet = (): string[] => {
  const potentialPangrams = getAllPotentialPangrams();
  const randomWord = potentialPangrams[Math.floor(Math.random() * potentialPangrams.length)];
  return Array.from(new Set(randomWord));
};

export const hasSevenUniqueLetters = (word: string): boolean => {
  const cleaned = word.toLowerCase()
  const uniqueLetters = new Set(cleaned);
  return uniqueLetters.size === 7;
}

export const getAllPotentialPangrams = (): string[] => {
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

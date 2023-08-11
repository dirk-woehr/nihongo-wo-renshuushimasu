export const verbGroups = {
  Group1: "Group 1",
  Group2: "Group 2",
  Group3: "Group 3",
} as const;

export type GroupKeys = keyof typeof verbGroups;

export type VerbGroups = (typeof verbGroups)[GroupKeys];

export type BaseWord = {
  kanji: string | null;
  hiragana: string | null;
  katakana: string | null;
  romaji: string;
};

export type VerbForm = {
  positive: BaseWord;
  negative: BaseWord;
};

export type AffirmationKeys = keyof VerbForm;

export type VerbForms = {
  nonPast: VerbForm;
  nonPastPolite: VerbForm;
  past: VerbForm;
  pastPolite: VerbForm;
  teForm: VerbForm;
  potential: VerbForm;
  /*   passive?: VerbForm;
  causative?: VerbForm;
  causativePassive?: VerbForm;
  imperative?: VerbForm; */
};

export type VerbFormKeys = keyof VerbForms;

export const verbFormTranslation = (key: string) => {
  switch (key) {
    case "nonPast":
      return "Non-Past";
    case "nonPastPolite":
      return "Non-Past Polite";
    case "past":
      return "Past";
    case "pastPolite":
      return "Past Polite";
    case "teForm":
      return "て-";
    case "potential":
      return "Potential";

    default:
      return key;
  }
};

export type Verb = {
  group: VerbGroups;
  meaning: string;
  forms: VerbForms;
};

export type Adjective = {
  meaning: string;
  nonPast: {
    positive: BaseWord;
    negative: BaseWord;
  };
  past: {
    positive: BaseWord;
    negative: BaseWord;
  };
};

export type Noun = {
  meaning: string;
  word: BaseWord;
};

export type WordData = {
  verbs: Verb[];
  adjectives: Adjective[];
  nouns: Noun[];
};

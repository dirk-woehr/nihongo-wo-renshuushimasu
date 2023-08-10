import { BaseWord, VerbFormKeys } from "./word-types";

export type GameItem = {
  sourceForm: VerbFormKeys;
  targetForm: VerbFormKeys;
  affirmation: boolean;
  verbIndex: number;
};

export type GameResult = GameItem & {
  match: boolean;
  answer: string;
  baseWord: BaseWord;
};

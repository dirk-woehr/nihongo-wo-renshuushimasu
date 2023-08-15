import { BaseWord, BaseWordKeys, VerbFormKeys } from "./word-types";

export type GameItem = {
  sourceForm: VerbFormKeys;
  targetForm: VerbFormKeys;
  affirmation: boolean;
  verbIndex: number;
};

export type GameResult = GameItem & {
  answer: string;
  sourceBaseWord: BaseWord;
  targetBaseWord: BaseWord;
  match: BaseWordKeys | null;
};

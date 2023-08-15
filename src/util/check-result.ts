import { BaseWord, VerbFormKeys } from "../domain/word-types";

export const checkResult = (
  baseWord: BaseWord,
  answer: string,
  verbForm: VerbFormKeys,
  affirmation: boolean
) => {
  const safeCompare = (target: string | null, answer: string) => {
    const trimmedTarget = target?.trim().toLocaleLowerCase();
    const trimmedAnswer = answer.trim().toLocaleLowerCase();
    if (trimmedTarget === trimmedAnswer) {
      return true;
    }
    const isNegativeTeForm = verbForm === "teForm" && !affirmation;
    if (isNegativeTeForm) {
      const naiForm = trimmedTarget
        ?.replace("nakute", "naide")
        .replace("なくて", "ないで");
      return naiForm === answer;
    }
    return false;
  };
  if (safeCompare(baseWord.romaji, answer)) return "romaji";
  if (safeCompare(baseWord.hiragana, answer)) return "hiragana";
  if (safeCompare(baseWord.kanji, answer)) return "kanji";
  if (safeCompare(baseWord.katakana, answer)) return "katakana";
  return null;
};

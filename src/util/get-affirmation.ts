import { AffirmationKeys } from "../domain/word-types";

export const getAffirmation = (affirmation: boolean): AffirmationKeys => {
  return affirmation ? "positive" : "negative";
};

import { Verb } from "../domain/word-types";

export const sortyByGroupAndRomaji = (verbs: Verb[]): Verb[] => {
  verbs.sort((v1, v2) => {
    const s1 = v1.group + v1.forms.nonPast.positive.romaji;
    const s2 = v2.group + v2.forms.nonPast.positive.romaji;
    if (s1 === s2) return 0;
    return s1 > s2 ? 1 : -1;
  });

  return verbs;
};

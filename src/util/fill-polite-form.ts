import { Verb } from "../domain/word-types";

export const fillPoliteForm = (
  verb: Verb,
  verbs: Verb[],
  verbIndex: number
) => {
  const politePositiveKanji = verb.forms.nonPastPolite.positive.kanji ?? "";
  const politePositiveHiragana =
    verb.forms.nonPastPolite.positive.hiragana ?? "";
  const politePositiveRomaji = verb.forms.nonPastPolite.positive.romaji;

  const newVerb = JSON.parse(JSON.stringify(verb)) as Verb;

  // overwrite romaji
  newVerb.forms.nonPastPolite.negative.romaji = politePositiveRomaji.replace(
    "masu",
    "masen"
  );
  newVerb.forms.pastPolite.positive.romaji = politePositiveRomaji.replace(
    "masu",
    "mashita"
  );
  newVerb.forms.pastPolite.negative.romaji = politePositiveRomaji.replace(
    "masu",
    "masendeshita"
  );

  // overwrite hiragana
  newVerb.forms.nonPastPolite.negative.hiragana =
    politePositiveHiragana.replace("ます", "ません");
  newVerb.forms.pastPolite.positive.hiragana = politePositiveHiragana.replace(
    "ます",
    "ました"
  );
  newVerb.forms.pastPolite.negative.hiragana = politePositiveHiragana.replace(
    "ます",
    "ませんでした"
  );

  // overwrite kanji
  newVerb.forms.nonPastPolite.negative.kanji = politePositiveKanji.replace(
    "ます",
    "ません"
  );
  newVerb.forms.pastPolite.positive.kanji = politePositiveKanji.replace(
    "ます",
    "ました"
  );
  newVerb.forms.pastPolite.negative.kanji = politePositiveKanji.replace(
    "ます",
    "ませんでした"
  );

  const newVerbs = JSON.parse(JSON.stringify(verbs)) as Verb[];
  newVerbs[verbIndex] = newVerb;

  return newVerbs;
};

export const autofurigana = function (kanji: string, kana: string) {
  const is_kanji = (c: string) => {
    return /[\u3000-\u303F\u4E00-\u9FEF]/.test(c);
  };

  type PairElement = string | null;

  // Kanji group -> kana group mappings.
  let pairs: PairElement[][] = [];

  // The number of characters into the kana that are mapped.
  let rp = 0;

  // The string of kana we are currently building to map to a kanji
  // group.
  let kana_build: string | null = "";
  let kanji_build: string | null = "";

  const build_push = () => {
    pairs.push([kanji_build, kana_build]);
    kana_build = "";
    kanji_build = "";
  };

  // Outer loop; walks through each character in kanji sentence.
  for (let kp = 0; kp < kanji.length; kp++) {
    kanji_build += kanji[kp];

    // Check if we're on a boundary.
    if (kp + 1 == kanji.length) {
      // We are at the end.
      while (rp < kana.length) {
        kana_build += kana[rp];
        rp++;
      }

      if (!is_kanji(kanji[kp])) kana_build = null;

      build_push();

      // We are done.
      break;
    } else if (is_kanji(kanji[kp]) && !is_kanji(kanji[kp + 1])) {
      // We need to "catch up" kana to kanji.
      while (
        kanji[kp + 1] !== kana[rp] ||
        (kana_build?.length ?? 0) < kanji_build.length
      ) {
        if (kana[rp] === undefined) {
          // We reached the end of the kana without finding a match.
          return null;
        }
        kana_build += kana[rp];
        rp++;
      }

      build_push();
    } else if (!is_kanji(kanji[kp]) && is_kanji(kanji[kp + 1])) {
      kana_build = null;
      rp += kanji_build.length;
      build_push();
    }
  }

  return pairs;
};

/* module.exports.autofurigana_brackets = function (kanji, kana) {
  let pairs = autofurigana(kanji, kana);
  let str = "";
  for (let i = 0; i < pairs.length; i++)
    if (pairs[i][1] !== null) {
      if (i != 0) str += " ";
      str += pairs[i][0] + "[" + pairs[i][1] + "]";
    } else str += pairs[i][0];

  return str;
}; */

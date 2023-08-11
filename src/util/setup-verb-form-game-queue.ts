import { verbs } from "../data/verbs";
import { GameTypes, gameTypes } from "../domain/gameTypes";
import { GameItem } from "../domain/queues";
import { VerbFormKeys } from "../domain/word-types";

export const setUpVerbFormGameQueue = (gameType: GameTypes, rounds: number) => {
  const newGameQueue: GameItem[] = [];
  const sourceForms: VerbFormKeys[] = [];
  const targetForms: VerbFormKeys[] = [];
  switch (gameType) {
    case gameTypes.taForm:
      sourceForms.push("nonPast", "nonPastPolite");
      targetForms.push("past");
      break;
    case gameTypes.teForm:
      sourceForms.push("nonPast", "nonPastPolite");
      targetForms.push("teForm");
      break;
    case gameTypes.potential:
      sourceForms.push("nonPast", "nonPastPolite");
      targetForms.push("potential");
      break;
    case gameTypes.random:
      sourceForms.push(
        "nonPast",
        "nonPastPolite",
        "past",
        "pastPolite",
        "teForm",
        "potential"
      );
      targetForms.push(
        "nonPast",
        "nonPastPolite",
        "past",
        "pastPolite",
        "teForm",
        "potential"
      );
      break;

    default:
      break;
  }

  let loopCounter = 0;

  while (newGameQueue.length < rounds) {
    loopCounter++;
    const sourceForm =
      sourceForms[Math.floor(Math.random() * sourceForms.length)];
    const targetForm =
      targetForms[Math.floor(Math.random() * targetForms.length)];

    const affirmation = Math.random() >= 0.5;
    const verbIndex = Math.floor(Math.random() * verbs.length);
    const newQueueItem: GameItem = {
      sourceForm,
      targetForm,
      affirmation,
      verbIndex,
    };

    const notSameForm = sourceForm !== targetForm;
    const itemDoesNotExist =
      newGameQueue.findIndex((item) => {
        return JSON.stringify(item) === JSON.stringify(newQueueItem);
      }) === -1;

    if (notSameForm && itemDoesNotExist) {
      newGameQueue.push(newQueueItem);
    }
  }
  return newGameQueue;
};

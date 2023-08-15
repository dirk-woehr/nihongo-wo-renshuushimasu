import { verbs } from "../data/verbs";
import { GameItem, GameResult } from "../domain/queues";
import { getAffirmation } from "./get-affirmation";

export type SetVerbFormResults = {
  verbFormQueue: GameItem[];
  verbFormResults: GameResult[];
};

export const setVerbFormResult = (
  queue: GameItem[],
  results: GameResult[],
  answer: string
): SetVerbFormResults => {
  const currentQueueItem = queue.pop();

  const verbFormQueue: GameItem[] = [...queue];
  const verbFormResults: GameResult[] = [];

  if (currentQueueItem === undefined) {
    return {
      verbFormQueue,
      verbFormResults: results,
    };
  }

  const { targetForm, sourceForm, verbIndex, affirmation } = currentQueueItem;
  const sourceBaseWord =
    verbs[verbIndex].forms[sourceForm][getAffirmation(affirmation)];
  const targetBaseWord =
    verbs[verbIndex].forms[targetForm][getAffirmation(affirmation)];

  verbFormResults.push(...results, {
    ...currentQueueItem,
    answer: answer,
    targetBaseWord,
    sourceBaseWord,
  });

  return {
    verbFormQueue,
    verbFormResults,
  };
};

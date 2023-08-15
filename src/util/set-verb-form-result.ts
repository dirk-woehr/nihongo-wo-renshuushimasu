import { verbs } from "../data/verbs";
import { GameItem, GameResult } from "../domain/queues";
import { checkResult } from "./check-result";
import { getAffirmation } from "./get-affirmation";
import { getResultToast } from "./get-result-toast";

import { useToast } from "vue-toastification";

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

  const toast = useToast();

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
    match: checkResult(targetBaseWord, answer, targetForm, affirmation),
  });

  const toastContent = getResultToast(
    verbFormResults[verbFormResults.length - 1]
  );
  toast(toastContent.message, {
    type: toastContent.type,
  });

  return {
    verbFormQueue,
    verbFormResults,
  };
};

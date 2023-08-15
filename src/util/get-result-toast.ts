import { TYPE } from "vue-toastification";
import { GameResult } from "../domain/queues";
import { checkResult } from "./check-result";

const SUCCESS_MESSAGGES = ["ヤッター", "ただしい", "すごい"];

const ERROR_MESSAGGES = ["いいえ", "ちがいます"];

type ResultToast = {
  message: string;
  type: TYPE;
};

const getResult = (result: GameResult): boolean => {
  const { targetBaseWord, affirmation, answer, targetForm } = result;
  return checkResult(targetBaseWord, answer, targetForm, affirmation) !== null;
};

export const getResultToast = (result: GameResult): ResultToast => {
  const success = getResult(result);
  const messages = success ? SUCCESS_MESSAGGES : ERROR_MESSAGGES;
  const index = Math.floor(Math.random() * messages.length);
  return {
    message: messages[index],
    type: success ? TYPE.SUCCESS : TYPE.ERROR,
  };
};

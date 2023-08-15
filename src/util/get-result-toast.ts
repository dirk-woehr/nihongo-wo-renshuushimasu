import { TYPE } from "vue-toastification";
import { GameResult } from "../domain/queues";

const SUCCESS_MESSAGGES = ["ヤッター", "ただしい", "すごい"];

const ERROR_MESSAGGES = ["いいえ", "ちがいます"];

type ResultToast = {
  message: string;
  type: TYPE;
};

export const getResultToast = (result: GameResult): ResultToast => {
  const success = result.match !== null;
  const messages = success ? SUCCESS_MESSAGGES : ERROR_MESSAGGES;
  const index = Math.floor(Math.random() * messages.length);
  return {
    message: messages[index],
    type: success ? TYPE.SUCCESS : TYPE.ERROR,
  };
};

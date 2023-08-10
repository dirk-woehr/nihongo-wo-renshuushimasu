<script setup lang="ts">
import styles from "./verb-form-training.module.css";
import { verbs } from "../../data/verbs";
import MainButton from "../main-button/main-button.vue";
import TrainingResult from "./verb-form-training-result.vue";
import { GameTypes, gameTypes } from "../../domain/gameTypes";
import { computed, ref } from "vue";
import { GameItem, GameResult } from "../../domain/queues";
import {
  VerbFormKeys,
  verbFormTranslation,
  AffirmationKeys,
} from "../../domain/word-types";

const emit = defineEmits<{
  (event: "trainingFinished"): void;
}>();

const props = defineProps<{ gameType: GameTypes; rounds: number }>();

const setUpGameQueue = () => {
  const newGameQueue: GameItem[] = [];
  const sourceForms: VerbFormKeys[] = [];
  const targetForms: VerbFormKeys[] = [];
  switch (props.gameType) {
    case gameTypes.taForm:
      sourceForms.push("nonPast", "nonPastPolite");
      targetForms.push("past");
      break;
    case gameTypes.teForm:
      sourceForms.push("nonPast", "nonPastPolite");
      targetForms.push("teForm");
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

  while (newGameQueue.length < props.rounds) {
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

const gameQueue = ref<GameItem[]>(setUpGameQueue());
const results = ref<GameResult[]>([]);
const answer = ref("");

const currentQueueItem = computed(() => {
  if (gameQueue.value.length > 0) {
    return gameQueue.value[gameQueue.value.length - 1];
  }
  return null;
});

const translatedVerbForms = computed(() => {
  return {
    source: verbFormTranslation(currentQueueItem.value?.sourceForm ?? ""),
    target: verbFormTranslation(currentQueueItem.value?.targetForm ?? ""),
  };
});

const getAffirmation = (affirmation: boolean): AffirmationKeys => {
  return affirmation ? "positive" : "negative";
};

const checkResult = () => {
  if (currentQueueItem.value === null) {
    return;
  }
  const { targetForm, sourceForm, verbIndex, affirmation } =
    currentQueueItem.value;
  const sourceBaseWord =
    verbs[verbIndex].forms[sourceForm][getAffirmation(affirmation)];
  const targetBaseWord =
    verbs[verbIndex].forms[targetForm][getAffirmation(affirmation)];

  results.value = [
    ...results.value,
    {
      ...currentQueueItem.value,
      answer: answer.value,
      targetBaseWord,
      sourceBaseWord,
    },
  ];
  const newQueue = [...gameQueue.value];
  newQueue.pop();
  gameQueue.value = newQueue;
  answer.value = "";
};
</script>

<template>
  <section v-if="currentQueueItem !== null">
    <h3>
      Change
      {{
        verbs[currentQueueItem.verbIndex].forms[currentQueueItem.sourceForm][
          getAffirmation(currentQueueItem.affirmation)
        ].kanji
      }}
    </h3>
    <h3>
      to {{ translatedVerbForms.target }}
      {{ getAffirmation(currentQueueItem.affirmation) }}
    </h3>
    <input type="text" name="answer" id="answer" v-model="answer" />
    <MainButton text="Check Result" @buttonClicked="checkResult" />
  </section>
  <section v-if="currentQueueItem === null">
    <table>
      <TrainingResult
        v-for="(result, index) in results"
        :key="index"
        :result="result"
        :round="index + 1"
      >
        {{ JSON.stringify(result, null, 2) }}
      </TrainingResult>
    </table>
    <MainButton
      text="Return to Selection"
      @buttonClicked="emit('trainingFinished')"
    />
  </section>
</template>

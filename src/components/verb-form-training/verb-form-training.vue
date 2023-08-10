<script setup lang="ts">
// import styles from "./verb-form-training.module.css";
import { verbs } from "../../data/verbs";
import MainButton from "../main-button/main-button.vue";
import TrainingResult from "./verb-form-training-result.vue";
import { GameTypes } from "../../domain/gameTypes";
import { computed, ref } from "vue";
import { GameItem, GameResult } from "../../domain/queues";
import { setUpVerbFormGameQueue } from "../../util/setup-verb-form-game-queue";
import { checkVerbFormResult } from "../../util/check-verb-form-result";
import { getAffirmation } from "../../util/get-affirmation";
import { verbFormTranslation } from "../../domain/word-types";

const emit = defineEmits<{
  (event: "trainingFinished"): void;
}>();

const props = defineProps<{ gameType: GameTypes; rounds: number }>();

const gameQueue = ref<GameItem[]>(
  setUpVerbFormGameQueue(props.gameType, props.rounds)
);
const results = ref<GameResult[]>([]);
const answer = ref("");

const checkResult = () => {
  if (currentQueueItem.value === null) {
    return;
  }
  const { verbFormQueue, verbFormResults } = checkVerbFormResult(
    gameQueue.value,
    results.value,
    answer.value
  );

  console.log({ verbFormQueue, verbFormResults });

  gameQueue.value = verbFormQueue;
  results.value = verbFormResults;
  answer.value = "";
};

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

const displaySourceWord = computed(() => {
  if (currentQueueItem.value === null) return "";
  const item = currentQueueItem.value;
  const baseWord =
    verbs[item.verbIndex].forms[item.sourceForm][
      getAffirmation(item.affirmation)
    ];
  if (baseWord.kanji !== null) return baseWord.kanji;
  if (baseWord.hiragana !== null) return baseWord.hiragana;
  if (baseWord.katakana !== null) return baseWord.katakana;
  return baseWord.romaji;
});
</script>

<template>
  <section v-if="currentQueueItem !== null">
    <h3>
      Change
      {{ displaySourceWord }}
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

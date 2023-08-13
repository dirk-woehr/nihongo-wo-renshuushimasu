// CSS Modules - component class name prefix: VerbFormTraining__
<script setup lang="ts">
import styles from "./verb-form-training.module.css";
import { verbs } from "../../data/verbs";
import MainButton from "../main-button/main-button.vue";
import TrainingResult from "./verb-form-training-result.vue";
import HelpBox from "./verb-form-help-box.vue";
import { GameTypes } from "../../domain/gameTypes";
import { computed, onUpdated, ref } from "vue";
import { GameItem, GameResult } from "../../domain/queues";
import { setUpVerbFormGameQueue } from "../../util/setup-verb-form-game-queue";
import { checkVerbFormResult } from "../../util/check-verb-form-result";
import { getAffirmation } from "../../util/get-affirmation";
import { verbFormTranslation, verbGroups } from "../../domain/word-types";

const emit = defineEmits<{
  (event: "trainingFinished"): void;
}>();

const props = defineProps<{ gameType: GameTypes; rounds: number }>();

const gameQueue = ref<GameItem[]>(
  setUpVerbFormGameQueue(props.gameType, props.rounds)
);
const results = ref<GameResult[]>([]);
const answer = ref("");
const showHelp = ref(false);

const currentQueueItem = computed(() => {
  if (gameQueue.value.length > 0) {
    return gameQueue.value[gameQueue.value.length - 1];
  }
  return null;
});

const checkResult = () => {
  if (currentQueueItem.value === null) {
    return;
  }
  const { verbFormQueue, verbFormResults } = checkVerbFormResult(
    gameQueue.value,
    results.value,
    answer.value
  );

  gameQueue.value = verbFormQueue;
  results.value = verbFormResults;
  answer.value = "";
  showHelp.value = false;
};

const translatedVerbForms = computed(() => {
  return {
    source: verbFormTranslation(currentQueueItem.value?.sourceForm ?? ""),
    target: verbFormTranslation(currentQueueItem.value?.targetForm ?? ""),
  };
});

const group = computed(() => {
  if (currentQueueItem.value === null) return verbGroups.Group1;
  return verbs[currentQueueItem.value.verbIndex].group;
});

const baseWord = computed(() => {
  if (currentQueueItem.value === null) return null;
  const item = currentQueueItem.value;
  return verbs[item.verbIndex].forms[item.sourceForm][
    getAffirmation(item.affirmation)
  ];
});

const displaySourceWord = computed(() => {
  if (currentQueueItem.value === null || baseWord.value === null) return "";

  if (baseWord.value.kanji !== null) return baseWord.value.kanji;
  if (baseWord.value.hiragana !== null) return baseWord.value.hiragana;
  if (baseWord.value.katakana !== null) return baseWord.value.katakana;
  return baseWord.value.romaji;
});

onUpdated(() => {
  document.getElementById("answer")?.focus();
});
</script>

<template>
  <section :class="styles.container" v-if="currentQueueItem !== null">
    <p :class="styles.mondai">
      {{ displaySourceWord }} <span :class="styles.arrow">⇒</span>
      {{ translatedVerbForms.target }}
    </p>
    <MainButton
      v-if="!showHelp"
      text="Show Help"
      @buttonClicked="showHelp = true"
    />
    <HelpBox
      v-if="baseWord !== null && showHelp"
      :baseWord="baseWord"
      :group="group"
    />
    <p>{{ gameQueue.length - 1 }} remaining</p>
    <p>
      <input
        :class="styles.kotae"
        type="text"
        name="answer"
        id="answer"
        autofocus
        v-model="answer"
        @keyup.enter="checkResult"
        :placeholder="'Enter ' + translatedVerbForms.target + ' Form'"
      />
    </p>
    <MainButton text="Next Question" @buttonClicked="checkResult" />
  </section>
  <section :class="styles.resultsContainer" v-if="currentQueueItem === null">
    <TrainingResult
      v-for="(result, index) in results"
      :key="index"
      :result="result"
      :round="index + 1"
    >
      {{ JSON.stringify(result, null, 2) }}
    </TrainingResult>
    <MainButton
      text="Return to Selection"
      @buttonClicked="emit('trainingFinished')"
    />
  </section>
</template>

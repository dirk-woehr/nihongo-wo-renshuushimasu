// CSS Modules - component class name prefix: VerbFormTraining__
<script setup lang="ts">
import styles from "./verb-form-training.module.css";
import { verbs } from "../../data/verbs";
import MainButton from "../main-button/main-button.vue";
import TrainingResult from "./verb-form-training-result.vue";
import ResultSummary from "../result-summary/result-summary.vue";
import HelpBox from "./verb-form-help-box.vue";
import { GameTypes } from "../../domain/gameTypes";
import { computed, ref } from "vue";
import { GameItem, GameResult } from "../../domain/queues";
import { setUpVerbFormGameQueue } from "../../util/setup-verb-form-game-queue";
import { setVerbFormResult } from "../../util/set-verb-form-result";
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

const setResult = () => {
  if (currentQueueItem.value === null) {
    return;
  }

  const { verbFormQueue, verbFormResults } = setVerbFormResult(
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
    <div :class="[styles.desktop]">
      <p>
        <input
          :class="styles.kotae"
          type="text"
          name="answer"
          id="answer"
          autofocus
          v-model="answer"
          @keyup.enter="setResult"
          :placeholder="'Enter ' + translatedVerbForms.target + ' Form'"
        />
      </p>
      <MainButton text="Next Question" @buttonClicked="setResult" />
    </div>
    <div :class="[styles.mobile]">
      <div :class="[styles.kotaeMobileContainer]">
        <input
          :class="styles.kotaeMobile"
          type="text"
          name="answer_small"
          id="answer_small"
          autofocus
          v-model="answer"
          @keyup.enter="setResult"
          :placeholder="'Enter ' + translatedVerbForms.target + ' Form'"
        />
        <label
          :class="styles.kotaeMobileButton"
          for="answer_small"
          @click="setResult"
        >
          <span>↲</span>
        </label>
      </div>
    </div>
  </section>
  <section :class="styles.resultsContainer" v-if="currentQueueItem === null">
    <ResultSummary :results="results" />
    <TrainingResult
      v-for="(result, index) in results"
      :key="index"
      :result="result"
      :round="index + 1"
      :verbForm="result.targetForm"
      :affirmation="result.affirmation"
    >
      {{ JSON.stringify(result, null, 2) }}
    </TrainingResult>
    <MainButton
      text="Return to Selection"
      @buttonClicked="emit('trainingFinished')"
    />
  </section>
</template>

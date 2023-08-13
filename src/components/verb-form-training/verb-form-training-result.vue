// CSS Modules - component class name prefix: VerbFormTrainingResult__
<script setup lang="ts">
import { computed } from "vue";
import { GameResult } from "../../domain/queues";
import styles from "./verb-form-training-result.module.css";
import { BaseWord, VerbFormKeys } from "../../domain/word-types";
const props = defineProps<{
  result: GameResult;
  round: number;
  verbForm: VerbFormKeys;
  affirmation: boolean;
}>();

const { targetBaseWord, answer } = props.result;

const safeCompare = (target: string | null, answer: string) => {
  const trimmedTarget = target?.trim().toLocaleLowerCase();
  const trimmedAnswer = answer.trim().toLocaleLowerCase();
  if (trimmedTarget === trimmedAnswer) {
    return true;
  }
  const isNegativeTeForm = props.verbForm === "teForm" && !props.affirmation;
  if (isNegativeTeForm) {
    const naiForm = trimmedTarget
      ?.replace("nakute", "naide")
      .replace("なくて", "ないで");
    return naiForm === answer;
  }
  return false;
};

const teExtension = computed(() => {
  const extension: BaseWord =
    props.verbForm === "teForm" && !props.affirmation
      ? {
          romaji: "/~naide",
          hiragana: "/~ないで",
          kanji: "/~ないで",
          katakana: null,
        }
      : {
          romaji: "",
          hiragana: null,
          kanji: null,
          katakana: null,
        };
  return extension;
});

const match = computed(() => {
  if (safeCompare(targetBaseWord.romaji, answer)) return "romaji";
  if (safeCompare(targetBaseWord.hiragana, answer)) return "hiragana";
  if (safeCompare(targetBaseWord.kanji, answer)) return "kanji";
  if (safeCompare(targetBaseWord.katakana, answer)) return "katakana";
  return null;
});
</script>

<template>
  <div :class="styles.resultsTable">
    <div :class="[styles.round, styles.cell, styles.head]">
      Round {{ round }}
    </div>
    <div :class="[styles.source, styles.cell, styles.head]">Source</div>
    <div :class="[styles.cell, styles.sourceKanji]">
      {{ result.sourceBaseWord.kanji }}
    </div>
    <div :class="[styles.cell, styles.sourceHiragana]">
      {{ result.sourceBaseWord.hiragana }}
    </div>
    <div :class="[styles.cell, styles.sourceRomaji]">
      {{ result.sourceBaseWord.romaji }}
    </div>
    <div :class="[styles.cell, styles.sourceKatakana]">
      {{ result.sourceBaseWord.katakana }}
    </div>
    <div :class="[styles.target, styles.cell, styles.head]">Target</div>
    <div
      :class="[
        styles.cell,
        styles.targetKanji,
        {
          [styles.success]: match !== null,
          [styles.error]: match === null,
          [styles.successHighlight]: match === 'kanji',
        },
      ]"
    >
      {{ result.targetBaseWord.kanji
      }}{{ result.targetBaseWord.kanji && teExtension.kanji }}
    </div>
    <div
      :class="[
        styles.cell,
        styles.targetHiragana,
        {
          [styles.success]: match !== null,
          [styles.error]: match === null,
          [styles.successHighlight]: match === 'hiragana',
        },
      ]"
    >
      {{ result.targetBaseWord.hiragana
      }}{{ result.targetBaseWord.hiragana && teExtension.hiragana }}
    </div>
    <div
      :class="[
        styles.cell,
        styles.targetRomaji,
        {
          [styles.success]: match !== null,
          [styles.error]: match === null,
          [styles.successHighlight]: match === 'romaji',
        },
      ]"
    >
      {{ result.targetBaseWord.romaji }}{{ teExtension.romaji }}
    </div>
    <div
      :class="[
        styles.cell,
        styles.targetKatakana,
        {
          [styles.success]: match !== null,
          [styles.error]: match === null,
          [styles.successHighlight]: match === 'katakana',
        },
      ]"
    >
      {{ result.targetBaseWord.katakana }}
    </div>
    <div
      :class="[
        styles.cell,
        styles.answer,
        {
          [styles.errorHighlight]: match === null,
          [styles.successHighlight]: match !== null,
        },
      ]"
    >
      {{ result.answer }}
    </div>
  </div>
</template>

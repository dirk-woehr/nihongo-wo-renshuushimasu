// CSS Modules - component class name prefix: VerbFormTrainingResult__
<script setup lang="ts">
import { computed } from "vue";
import { GameResult } from "../../domain/queues";
import styles from "./verb-form-training-result.module.css";
import { BaseWord, VerbFormKeys } from "../../domain/word-types";
import { checkResult } from "../../util/check-result";
const props = defineProps<{
  result: GameResult;
  round: number;
  verbForm: VerbFormKeys;
  affirmation: boolean;
}>();

const { targetBaseWord, answer, affirmation } = props.result;

const teExtension = computed(() => {
  const extension: BaseWord =
    props.verbForm === "teForm" && !affirmation
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
  return checkResult(targetBaseWord, answer, props.verbForm, affirmation);
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

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
  nonPastPositive: string;
}>();

const { affirmation } = props.result;

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
          [styles.success]: result.match !== null,
          [styles.error]: result.match === null,
          [styles.successHighlight]: result.match === 'kanji',
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
          [styles.success]: result.match !== null,
          [styles.error]: result.match === null,
          [styles.successHighlight]: result.match === 'hiragana',
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
          [styles.success]: result.match !== null,
          [styles.error]: result.match === null,
          [styles.successHighlight]: result.match === 'romaji',
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
          [styles.success]: result.match !== null,
          [styles.error]: result.match === null,
          [styles.successHighlight]: result.match === 'katakana',
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
          [styles.errorHighlight]: result.match === null,
          [styles.successHighlight]: result.match !== null,
        },
      ]"
    >
      {{ result.answer }}
    </div>
    <div :class="styles.jisho">
      <a :href="'https://jisho.org/search/' + nonPastPositive" target="_blank"
        >View in Jisho.org</a
      >
    </div>
  </div>
</template>

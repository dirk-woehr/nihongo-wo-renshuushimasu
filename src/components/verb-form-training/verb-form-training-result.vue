<script setup lang="ts">
import { computed } from "vue";
import { GameResult } from "../../domain/queues";
import styles from "./verb-form-training-result.module.css";
const props = defineProps<{ result: GameResult; round: number }>();

const { targetBaseWord, answer } = props.result;

const match = computed(() => {
  if (targetBaseWord.romaji === answer) return "romaji";
  if (targetBaseWord.hiragana === answer) return "hiragana";
  if (targetBaseWord.kanji === answer) return "kanji";
  if (targetBaseWord.katakana === answer) return "katakana";
  return null;
});
</script>

<template>
  <tr>
    <th colspan="6">Round {{ round }}</th>
  </tr>
  <tr>
    <th>Source</th>
    <td>{{ result.sourceBaseWord.kanji }}</td>
    <td>{{ result.sourceBaseWord.hiragana }}</td>
    <td>{{ result.sourceBaseWord.romaji }}</td>
    <td>{{ result.sourceBaseWord.katakana }}</td>
    <th>Answer</th>
  </tr>
  <tr>
    <th>Target</th>
    <td
      :class="{
        [styles.success]: match !== null,
        [styles.error]: match === null,
        [styles.successHighlight]: match === 'kanji',
      }"
    >
      {{ result.targetBaseWord.kanji }}
    </td>
    <td
      :class="{
        [styles.success]: match !== null,
        [styles.error]: match === null,
        [styles.successHighlight]: match === 'hiragana',
      }"
    >
      {{ result.targetBaseWord.hiragana }}
    </td>
    <td
      :class="{
        [styles.success]: match !== null,
        [styles.error]: match === null,
        [styles.successHighlight]: match === 'romaji',
      }"
    >
      {{ result.targetBaseWord.romaji }}
    </td>
    <td
      :class="{
        [styles.success]: match !== null,
        [styles.error]: match === null,
        [styles.successHighlight]: match === 'katakana',
      }"
    >
      {{ result.targetBaseWord.katakana }}
    </td>
    <td
      :class="{
        [styles.errorHighlight]: match === null,
        [styles.successHighlight]: match !== null,
      }"
    >
      {{ result.answer }}
    </td>
  </tr>
</template>

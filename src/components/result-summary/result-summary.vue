<script setup lang="ts">
import styles from "./result-summary.module.css";
import { GameResult } from "../../domain/queues";
import { computed } from "vue";

const { results } = defineProps<{ results: GameResult[] }>();

const resultSummary = computed(() => {
  const percentage =
    results.reduce((acc, result) => {
      return (result.match !== null ? 1 : 0) + acc;
    }, 0) / results.length;

  if (percentage < 0.5) return "頑張ってください";
  if (percentage === 1) return "どのくらい日本語を勉強していますか？";
  return "日本語は上手です";
});
</script>

<template>
  <h2 :class="styles.summary">{{ resultSummary }}</h2>
</template>

<script setup lang="ts">
import { BaseWord, VerbGroups } from "../../domain/word-types";
import styles from "./verb-form-help-box.module.css";

defineProps<{
  baseWord: BaseWord;
  group: VerbGroups;
  nonPastPositive: string;
}>();
</script>

<template>
  <p :class="styles.hint" v-if="baseWord.romaji.length > 0">
    {{ baseWord.romaji }}
  </p>
  <p :class="styles.hint">{{ group }}</p>
  <p :class="styles.hint">
    <a :href="'https://jisho.org/search/' + nonPastPositive" target="_blank"
      >View in Jisho.org</a
    >
  </p>
</template>

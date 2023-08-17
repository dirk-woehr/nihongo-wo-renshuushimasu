<script setup lang="ts">
import { BaseWord, VerbGroups } from "../../domain/word-types";
import styles from "./verb-form-help-box.module.css";

defineProps<{ baseWord: BaseWord; group: VerbGroups }>();
</script>

<template>
  <p
    :class="styles.hint"
    v-if="baseWord.hiragana !== null && baseWord.hiragana.length > 0"
  >
    {{ baseWord.hiragana }}
  </p>
  <p :class="styles.hint" v-if="baseWord.romaji.length > 0">
    {{ baseWord.romaji }}
  </p>
  <p :class="styles.hint">{{ group }}</p>
</template>

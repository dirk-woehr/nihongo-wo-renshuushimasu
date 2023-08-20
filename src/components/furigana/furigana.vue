<script setup lang="ts">
import { autofurigana } from "../../util/auto-furigana";
import styles from "./furigana.module.css";
const props = defineProps<{ kanji: string; hiragana: string }>();

const furigana = autofurigana(props.kanji, props.hiragana);
</script>

<template>
  <ruby :class="styles.furiganaRuby">
    <template v-for="element in furigana">
      {{ element[0] }} <rp>(</rp
      ><rt :class="styles.furiganaRt">{{ element[1] }}</rt
      ><rp>)</rp>
    </template>
  </ruby>
</template>

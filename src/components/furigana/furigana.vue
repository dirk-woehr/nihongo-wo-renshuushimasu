<script setup lang="ts">
import { autofurigana } from "../../util/auto-furigana";
const props = defineProps<{ kanji: string; hiragana: string }>();

const furigana = autofurigana(props.kanji, props.hiragana);
</script>

<template>
  <ruby>
    <template v-for="element in furigana">
      {{ element[0] }} <rp>(</rp><rt>{{ element[1] }}</rt
      ><rp>)</rp>
    </template>
  </ruby>
</template>

<style>
ruby {
  ruby-position: over;
}
</style>

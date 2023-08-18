<script setup lang="ts">
import { computed, ref } from "vue";
import styles from "./edit-list.module.css";
import {
  BaseWord,
  Verb,
  VerbGroups,
  verbGroups,
} from "../../domain/word-types";
import { verbs } from "../../data/verbs";

const filterWord = ref<string>("");
const filterGroup = ref<VerbGroups | string>("");

defineProps<{ verbs: Verb[]; verbIndex: number }>();

const checkGroupMatch = (verbGroup: VerbGroups): boolean => {
  if (filterGroup.value === "") return true;
  return verbGroup === filterGroup.value;
};

const safeCompare = (word: string): boolean => {
  const trimmedWord = word.trim().toLocaleLowerCase();
  return trimmedWord.includes(filterWord.value);
};

const checkWordMatch = (baseWord: BaseWord): boolean => {
  if (filterWord.value === "") return true;
  if (safeCompare(baseWord.romaji)) return true;
  if (safeCompare(baseWord.kanji ?? "_")) return true;
  if (safeCompare(baseWord.hiragana ?? "_")) return true;
  return false;
};

const filteredVerbs = computed(() => {
  return verbs.filter((verb) => {
    return (
      checkGroupMatch(verb.group) && checkWordMatch(verb.forms.nonPast.positive)
    );
  });
});

const emit = defineEmits<{
  (event: "verbSelected", verbIndex: number): void;
}>();
</script>

<template>
  <table :class="styles.verbList">
    <tr :class="[{ [styles.listRowHead]: true }]">
      <th>Kanji</th>
      <th>Hiragana</th>
      <th>Romaji</th>
      <th>Group</th>
    </tr>
    <tr>
      <th colspan="3">
        <input type="text" v-model="filterWord" />
      </th>
      <th>
        <select name="group" id="group" v-model="filterGroup">
          <option value="" :selected="filterGroup === ''">Show all</option>
          <option
            v-for="(key, index) in verbGroups"
            :value="key"
            :selected="verbs[verbIndex].group === key"
            :key="index"
          >
            {{ key }}
          </option>
        </select>
      </th>
    </tr>
    <tr
      v-for="(verb, index) in filteredVerbs"
      :key="index"
      @click="emit('verbSelected', index)"
      :class="[
        { [styles.active]: index === verbIndex },
        { [styles.listRow]: true },
      ]"
      class="listRow"
    >
      <td>{{ verb.forms.nonPast.positive.kanji }}</td>
      <td>{{ verb.forms.nonPast.positive.hiragana }}</td>
      <td>{{ verb.forms.nonPast.positive.romaji }}</td>
      <td>{{ verb.group }}</td>
    </tr>
  </table>
</template>

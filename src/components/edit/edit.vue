<script setup lang="ts">
import styles from "./edit.module.css";
import { computed, ref } from "vue";
import { verbs as rawVerbs } from "../../data/verbs";
import { newVerb } from "../../data/newVerb";
import {
  BaseWord,
  Verb,
  VerbForms,
  verbGroups,
  verbFormTranslation,
} from "../../domain/word-types";
// const { verbs } = data;

const verbs = ref(rawVerbs);
const verbIndex = ref(0);

const addNewVerb = () => {
  verbs.value = [...verbs.value, newVerb];
};

const getBaseWord = (baseWord: BaseWord): BaseWord => {
  return {
    kanji:
      baseWord.kanji !== null && baseWord.kanji.length > 0
        ? baseWord.kanji
        : null,
    hiragana:
      baseWord.hiragana !== null && baseWord.hiragana.length > 0
        ? baseWord.hiragana
        : null,
    katakana:
      baseWord.katakana !== null && baseWord.katakana.length > 0
        ? baseWord.katakana
        : null,
    romaji: baseWord.romaji,
  };
};

const verbKeys = computed(() => {
  return Object.keys(verbs.value[verbIndex.value].forms) as (keyof VerbForms)[];
});

const stringifiedVerbs = computed(() => {
  const newVerbs: Partial<Verb>[] = [];
  verbs.value.forEach((verb) => {
    const newVerb: Partial<Verb> = {};
    Object.keys(verb).forEach((key) => {
      switch (key) {
        case "group":
          newVerb[key] = verb[key];
          break;
        case "meaning":
          newVerb[key] = verb[key];
          break;
        case "forms":
          newVerb["forms"] = verb.forms;
          Object.keys(newVerb.forms).forEach((formKey) => {
            if (newVerb.forms !== undefined) {
              const trueKey = formKey as keyof VerbForms;
              const currentForm = newVerb.forms[trueKey];
              if (currentForm != undefined) {
                currentForm.positive = getBaseWord(currentForm.positive);
                currentForm.negative = getBaseWord(currentForm.negative);
              }
            }
          });
          break;

        default:
          break;
      }
    });
    newVerbs.push(newVerb);
  });

  const fileHead =
    'import { Verb } from "../domain/word-types";\n\nexport const verbs:Verb[] = ';

  return fileHead + JSON.stringify(newVerbs, null, 2) + ";";
});

const copyVerbList = () => {
  navigator.clipboard.writeText(stringifiedVerbs.value).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
};
</script>

<template>
  <div :class="styles.homeContainer">
    <div :class="styles.listContainer">
      <router-link to="/">Home</router-link>
      <h1 :class="styles.headline">Edit content:</h1>
      <button @click="copyVerbList">Copy Verb List</button>
      <button @click="addNewVerb">Add New Verb</button>
      <div :class="styles.editContainer">
        <table :class="styles.verbList">
          <tr :class="[{ [styles.listRowHead]: true }]">
            <th>Kanji</th>
            <th>Hiragana</th>
            <th>Romaji</th>
          </tr>
          <tr
            v-for="(verb, index) in verbs"
            :key="index"
            @click="verbIndex = index"
            :class="[
              { [styles.active]: index === verbIndex },
              { [styles.listRow]: true },
            ]"
            class="listRow"
          >
            <td>{{ verb.forms.nonPast.positive.kanji }}</td>
            <td>{{ verb.forms.nonPast.positive.hiragana }}</td>
            <td>{{ verb.forms.nonPast.positive.romaji }}</td>
          </tr>
        </table>
        <form>
          <table :class="styles.editTable">
            <tr>
              <th>Group / Meaning</th>
              <td>
                <select
                  name="group"
                  id="group"
                  v-model="verbs[verbIndex].group"
                >
                  <option
                    v-for="(key, index) in verbGroups"
                    :value="key"
                    :selected="verbs[verbIndex].group === key"
                    :key="index"
                  >
                    {{ key }}
                  </option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  name="meaning"
                  id="meaning"
                  v-model="verbs[verbIndex].meaning"
                />
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Form</th>
              <th>Kanji</th>
              <th>Hirgana</th>
              <th>Romaji</th>
              <th>Katakana</th>
            </tr>
            <template v-for="formKey in verbKeys" :key="formKey + '_positive'">
              <tr>
                <th :class="styles.editTableHead">
                  {{ verbFormTranslation(formKey) }} Positive
                </th>
                <td>
                  <input
                    type="text"
                    :name="formKey + 'Positive' + 'Kanji'"
                    :id="formKey + 'Positive' + 'Kanji'"
                    v-model="verbs[verbIndex].forms[formKey].positive.kanji"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    :name="formKey + 'Positive' + 'Hiragana'"
                    :id="formKey + 'Positive' + 'Hiragana'"
                    v-model="verbs[verbIndex].forms[formKey].positive.hiragana"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    :name="formKey + 'Positive' + 'Romaji'"
                    :id="formKey + 'Positive' + 'Romaji'"
                    v-model="verbs[verbIndex].forms[formKey].positive.romaji"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    :name="formKey + 'Positive' + 'Katakana'"
                    :id="formKey + 'Positive' + 'Katakana'"
                    v-model="verbs[verbIndex].forms[formKey].positive.katakana"
                  />
                </td>
              </tr>
              <tr>
                <th :class="styles.editTableHead">
                  {{ verbFormTranslation(formKey) }} Negative
                </th>
                <td>
                  <input
                    type="text"
                    :name="formKey + 'Negative' + 'Kanji'"
                    :id="formKey + 'Negative' + 'Kanji'"
                    v-model="verbs[verbIndex].forms[formKey].negative.kanji"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    :name="formKey + 'Negative' + 'Hiragana'"
                    :id="formKey + 'Negative' + 'Hiragana'"
                    v-model="verbs[verbIndex].forms[formKey].negative.hiragana"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    :name="formKey + 'Negative' + 'Romaji'"
                    :id="formKey + 'Negative' + 'Romaji'"
                    v-model="verbs[verbIndex].forms[formKey].negative.romaji"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    :name="formKey + 'Negative' + 'Katakana'"
                    :id="formKey + 'Negative' + 'Katakana'"
                    v-model="verbs[verbIndex].forms[formKey].negative.katakana"
                  />
                </td>
              </tr>
            </template>
          </table>
        </form>
      </div>
    </div>
  </div>
</template>

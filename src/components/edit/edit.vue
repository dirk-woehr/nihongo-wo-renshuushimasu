// CSS Modules - component class name prefix: Edit__
<script setup lang="ts">
import styles from "./edit.module.css";
import { computed, ref } from "vue";
import { verbs as rawVerbs } from "../../data/verbs";
import { newVerb } from "../../data/newVerb";
import FeatureContainer from "../feature-container/feature-container.vue";
import EditList from "./edit-list.vue";
import MainButton from "../main-button/main-button.vue";
import RouterLink from "../router-link/router-link.vue";
import {
  BaseWord,
  Verb,
  VerbForms,
  verbGroups,
  verbFormTranslation,
  VerbFormKeys,
} from "../../domain/word-types";
import { sortyByGroupAndRomaji } from "../../util/sort-verbs-by-group-and-romaji";
import { fillPoliteForm } from "../../util/fill-polite-form";

const verbs = ref(sortyByGroupAndRomaji(rawVerbs));
const verbIndex = ref(0);
const sourceKanj = ref("");
const targetHiragana = ref("");
const showList = ref(false);

const addNewVerb = () => {
  verbs.value = [...verbs.value, { ...JSON.parse(JSON.stringify(newVerb)) }];
  verbIndex.value = verbs.value.length - 1;
};

const setVerbIndex = (index: number) => {
  verbIndex.value = index;
};

const replaceKanji = () => {
  if (sourceKanj.value.length * targetHiragana.value.length > 0) {
    const verb = JSON.parse(
      JSON.stringify(verbs.value[verbIndex.value])
    ) as Verb;
    jishoOrder.forEach((key) => {
      verb.forms[key].positive.hiragana =
        verb.forms[key].positive.kanji?.replace(
          sourceKanj.value,
          targetHiragana.value
        ) ?? null;
      verb.forms[key].negative.hiragana =
        verb.forms[key].negative.kanji?.replace(
          sourceKanj.value,
          targetHiragana.value
        ) ?? null;
    });
    const newVerbs = JSON.parse(JSON.stringify(verbs.value)) as Verb[];
    newVerbs[verbIndex.value] = verb;

    verbs.value = newVerbs;
  }
  sourceKanj.value = "";
  targetHiragana.value = "";
};

const setPoliteForm = () => {
  verbs.value = fillPoliteForm(
    verbs.value[verbIndex.value],
    verbs.value,
    verbIndex.value
  );
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

  return (
    fileHead +
    JSON.stringify(sortyByGroupAndRomaji(newVerbs as Verb[]), null, 2) +
    ";"
  );
});

const jishoOrder: VerbFormKeys[] = [
  "nonPast",
  "nonPastPolite",
  "past",
  "pastPolite",
  "teForm",
  "potential",
];

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
  <FeatureContainer>
    <RouterLink :to="{ name: 'Home' }">Home</RouterLink>
    <h1 :class="styles.headline">Edit content:</h1>
    <MainButton text="Copy Verb List" @buttonClicked="copyVerbList" />
    <MainButton text="Add New Verb" @buttonClicked="addNewVerb" />
    <div :class="styles.editContainer">
      <div class="listContainer">
        <button @click="showList = !showList" :class="styles.toggleList">
          {{ showList ? "Hide" : "Show" }} List
        </button>
        <EditList
          v-if="showList"
          :verbs="verbs"
          :verbIndex="verbIndex"
          @verbSelected="setVerbIndex"
        />
      </div>
      <div>
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
            <template v-for="formKey in jishoOrder" :key="formKey">
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
            <tr>
              <th></th>
              <td>
                <input type="text" name="sourceKanj" v-model="sourceKanj" />
              </td>
              <td>
                <input
                  type="text"
                  name="targetHiragana"
                  v-model="targetHiragana"
                />
              </td>
              <td colspan="2"></td>
            </tr>
          </table>
        </form>
        <div :class="styles.utilButtons">
          <MainButton text="Replace Kanj" @buttonClicked="replaceKanji" />
          <MainButton text="Fill Polite Form" @buttonClicked="setPoliteForm" />
        </div>
      </div>
    </div>
  </FeatureContainer>
</template>

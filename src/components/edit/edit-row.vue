<script setup lang="ts">
import { toRef } from "vue";
import { VerbForm, VerbForms } from "../../domain/word-types";

const props = defineProps<{
  index: number;
  verbForm: VerbForm;
  formKey: keyof VerbForms;
  updateVerbForm: (
    index: Number,
    verbForm: VerbForm,
    formKey: keyof VerbForms
  ) => void;
}>();

const verb = toRef({ ...props.verbForm });
</script>
<template>
  <tr v-if="verb !== undefined">
    <th>{{ formKey }} Positive</th>
    <td>
      <input
        type="text"
        :name="formKey + 'Positive' + 'Kanji'"
        :id="formKey + 'Positive' + 'Kanji'"
        v-model="verb.positive.kanji"
      />
    </td>
    <td>
      <input
        type="text"
        :name="formKey + 'Positive' + 'Hiragana'"
        :id="formKey + 'Positive' + 'Hiragana'"
        v-model="verb.positive.hiragana"
      />
    </td>
    <td>
      <input
        type="text"
        :name="formKey + 'Positive' + 'Romaji'"
        :id="formKey + 'Positive' + 'Romaji'"
        v-model="verb.positive.romaji"
      />
    </td>
    <td>
      <input
        type="text"
        :name="formKey + 'Positive' + 'Katakana'"
        :id="formKey + 'Positive' + 'Katakana'"
        v-model="verb.positive.katakana"
      />
    </td>
  </tr>
  <tr v-if="verb !== undefined">
    <th>{{ formKey }} Negative</th>
    <td>
      <input
        type="text"
        :name="formKey + 'Negative' + 'Kanji'"
        :id="formKey + 'Negative' + 'Kanji'"
        v-model="verb.negative.kanji"
      />
    </td>
    <td>
      <input
        type="text"
        :name="formKey + 'Negative' + 'Hiragana'"
        :id="formKey + 'Negative' + 'Hiragana'"
        v-model="verb.negative.hiragana"
      />
    </td>
    <td>
      <input
        type="text"
        :name="formKey + 'Negative' + 'Romaji'"
        :id="formKey + 'Negative' + 'Romaji'"
        v-model="verb.negative.romaji"
      />
    </td>
    <td>
      <input
        type="text"
        :name="formKey + 'Negative' + 'Katakana'"
        :id="formKey + 'Negative' + 'Katakana'"
        v-model="verb.negative.katakana"
      />
    </td>
  </tr>
</template>

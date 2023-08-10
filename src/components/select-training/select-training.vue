<script setup lang="ts">
import styles from "./select-training.module.css";
import MainButton from "../main-button/main-button.vue";
import VerbFormTraining from "../verb-form-training/verb-form-training.vue";
import { GameTypes, gameTypes } from "../../domain/gameTypes";
import { ref } from "vue";

const gameType = ref<GameTypes | null>(null);

const setGameType = (newGameType: GameTypes | null) => {
  gameType.value = newGameType;
};
</script>

<template>
  <div :class="styles.mainSelection" v-if="gameType === null">
    <div :class="styles.selectContainer">
      <MainButton
        v-for="(gameKey, index) in gameTypes"
        @buttonClicked="setGameType(gameKey)"
        :text="gameKey"
        :key="index"
      />
    </div>
  </div>
  <VerbFormTraining
    v-if="gameType !== null"
    :gameType="gameType"
    :rounds="3"
    @trainingFinished="gameType = null"
  />
</template>

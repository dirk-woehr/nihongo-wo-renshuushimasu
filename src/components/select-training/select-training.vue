<script setup lang="ts">
// import styles from "./select-training.module.css";
import MainButton from "../main-button/main-button.vue";
import VerbFormTraining from "../verb-form-training/verb-form-training.vue";
import FeatureContainer from "../feature-container/feature-container.vue";
import RouterLink from "../router-link/router-link.vue";
import { GameTypes, gameTypes } from "../../domain/gameTypes";
import { ref } from "vue";

const gameType = ref<GameTypes | null>(null);

const setGameType = (newGameType: GameTypes | null) => {
  gameType.value = newGameType;
};
</script>

<template>
  <FeatureContainer>
    <RouterLink :to="{ name: 'Home' }">Home</RouterLink>
    <MainButton
      v-if="gameType === null"
      v-for="(gameKey, index) in gameTypes"
      @buttonClicked="setGameType(gameKey)"
      :text="gameKey"
      :key="index"
    />
    <VerbFormTraining
      v-if="gameType !== null"
      :gameType="gameType"
      :rounds="10"
      @trainingFinished="setGameType(null)"
    />
  </FeatureContainer>
</template>

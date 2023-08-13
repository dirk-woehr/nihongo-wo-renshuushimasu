// CSS Modules - component class name prefix: SelectTraining__
<script setup lang="ts">
import styles from "./select-training.module.css";
import MainButton from "../main-button/main-button.vue";
import SmallButton from "../small-button/small-button.vue";
import VerbFormTraining from "../verb-form-training/verb-form-training.vue";
import FeatureContainer from "../feature-container/feature-container.vue";
import RouterLink from "../router-link/router-link.vue";
import { GameTypes, gameTypes } from "../../domain/gameTypes";
import { ref, watch } from "vue";

const gameType = ref<GameTypes | null>(null);
const rounds = ref<number>(localStorage.rounds ? localStorage.rounds : 10);

const MAX_ROUNDS = 30;

const setGameType = (newGameType: GameTypes | null) => {
  gameType.value = newGameType;
};

watch(
  () => rounds.value,
  (newValue, oldValue) => {
    if (newValue !== oldValue) localStorage.rounds = newValue;
  }
);

const setRounds = (e: Event) => {
  const { value } = e.target as HTMLInputElement;
  const num = parseInt(value);
  if (num < 1 || num > MAX_ROUNDS) {
    return;
  }
  rounds.value = Math.floor(num);
};
</script>

<template>
  <FeatureContainer>
    <RouterLink :to="{ name: 'Home' }">Home</RouterLink>
    <template v-if="gameType === null">
      <div :class="styles.rounds">
        <label :class="styles.rounds" for="rounds">Rounds: </label>
        <SmallButton
          text="-"
          @buttonClicked="rounds--"
          :disabled="rounds < 2"
        />
        <input
          :class="styles.rounds"
          :min="1"
          :max="MAX_ROUNDS"
          type="number"
          name="rounds"
          id="rounds"
          :value="rounds"
          @change="setRounds"
        />
        <SmallButton
          text="+"
          @buttonClicked="rounds++"
          :disabled="rounds > 29"
        />
      </div>
      <MainButton
        v-for="(gameKey, index) in gameTypes"
        @buttonClicked="setGameType(gameKey)"
        :text="gameKey"
        :key="index"
      />
    </template>
    <VerbFormTraining
      v-if="gameType !== null"
      :gameType="gameType"
      :rounds="rounds"
      @trainingFinished="setGameType(null)"
    />
  </FeatureContainer>
</template>

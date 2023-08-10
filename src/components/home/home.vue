<script setup lang="ts">
import styles from "./home.module.css";
import FeatureContainer from "../feature-container/feature-container.vue";
import RouterLink from "../router-link/router-link.vue";
</script>

<template>
  <FeatureContainer>
    <h1 :class="styles.headline">日本語を練習しましょう！</h1>
    <RouterLink to="/training">Training</RouterLink>
    <RouterLink to="/edit">Edit Content</RouterLink>
  </FeatureContainer>
</template>

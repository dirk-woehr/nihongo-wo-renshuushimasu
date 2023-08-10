<script setup lang="ts">
import styles from "./home.module.css";
</script>

<template>
  <div :class="styles.homeContainer">
    <div :class="styles.welcomeContainer">
      <h1 :class="styles.headline">日本語を練習しましょう！</h1>
      <router-link to="/training">Training</router-link>
      <router-link to="/edit">Edit Content</router-link>
    </div>
  </div>
</template>

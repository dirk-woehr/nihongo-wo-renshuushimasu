<script setup lang="ts">
import styles from "./main-button.module.css";

defineProps<{ text: string }>();

const emit = defineEmits<{
  (event: "buttonClicked"): void;
}>();
</script>

<template>
  <button :class="styles.mainButton" @click="emit('buttonClicked')">
    {{ text }}
  </button>
</template>

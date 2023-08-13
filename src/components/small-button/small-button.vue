// CSS Modules - component class name prefix: MainButton__
<script setup lang="ts">
import styles from "./small-button.module.css";

defineProps<{ text: string; disabled?: boolean }>();

const emit = defineEmits<{
  (event: "buttonClicked"): void;
}>();
</script>

<template>
  <button
    :class="styles.smallButton"
    @click="emit('buttonClicked')"
    :disabled="disabled"
  >
    {{ text }}
  </button>
</template>

// CSS Modules - component class name prefix: FeatureContainer__
<script setup lang="ts">
import styles from "./feature-container.module.css";
</script>

<template>
  <div :class="styles.mainSelection">
    <div :class="styles.selectContainer">
      <slot></slot>
    </div>
  </div>
</template>

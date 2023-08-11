// CSS Modules - component class name prefix: RouterLink__
<script setup lang="ts">
import { RouteLocationRaw } from "vue-router";
import styles from "./router-link.module.css";

defineProps<{ to: RouteLocationRaw }>();
</script>

<template>
  <router-link :class="styles.mainLink" :to="to">
    <slot></slot>
  </router-link>
</template>

<template>
  <SixTop v-if="size === 6" />
</template>

<script setup lang="ts">
  import { defineProps } from "vue";

  import SixTop from "./tables/SixTop.vue";

  const props = defineProps({
    size: {
      type: Number,
      default: 6,
    },
  });
</script>

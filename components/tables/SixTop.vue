<template>
  <div class="py-4 w-full max-w-[200px]">
    <div class="grid grid-cols-3">
      <div class="flex justify-center py-4">
        <Seat :seat="1" />
      </div>
      <div class="flex justify-center py-4">
        <Seat :seat="2" />
      </div>
      <div class="flex justify-center py-4">
        <Seat :seat="3" />
      </div>
    </div>
    <div class="w-full h-24 dark:bg-slate-400 rounded"></div>
    <div class="grid grid-cols-3">
      <div class="flex justify-center py-4">
        <Seat :seat="4" />
      </div>
      <div class="flex justify-center py-4">
        <Seat :seat="5" />
      </div>
      <div class="flex justify-center py-4">
        <Seat :seat="6" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Seat from "./Seat.vue";
</script>

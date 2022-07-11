<template>
  <div>
    <div class="text-2xl font-bold">Liquor</div>

    <div
      class="mt-8 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 overflow-hidden rounded-md"
    >
      <ul role="list" class="divide-y divide-slate-200 dark:divide-slate-700">
        <li
          v-for="(brands, liquorName) in liquors"
          :key="liquorName"
          class="flex justify-between items-center px-6 py-4"
        >
          <div>
            <div class="font-medium">
              {{ capitalizeFirstLetter(liquorName) }}
            </div>

            <div class="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Base: {{ brands.join(", ") }}
            </div>
          </div>
          <div></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  const liquors = ref({
    vodka: ["Skyy", "Ketel One", "Titos", "Grey Goose", "Belvedere", "Purus"],
    gin: [
      "Beefeater",
      "Plymouth",
      "Old Fourth",
      "Hendricks",
      "Bombay Sapphire",
      "Plucinque",
    ],
    rum: ["Meyers Jamaican", "JM", "Plantation Overproof", "Bacardi White"],
    whiskey: ["Crown Royal", "Jack Daniels", "Jameson"],
    rye: ["Old Overholt", "Bulitt"],
  });

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
</script>

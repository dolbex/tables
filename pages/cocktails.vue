<template>
  <div>
    <div class="text-2xl font-bold">Cocktails</div>

    <div
      class="mt-8 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 overflow-hidden rounded-md"
    >
      <ul role="list" class="divide-y divide-slate-200 dark:divide-slate-700">
        <li
          v-for="cocktail in cocktails"
          :key="cocktail.name"
          class="flex justify-between items-center px-6 py-4"
        >
          <div>
            <div class="font-medium">{{ cocktail.name }}</div>

            <div class="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Base: {{ cocktail.base.join(", ") }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  const cocktails = ref([
    {
      name: "Manhattan",
      base: ["bourbon", "whiskey", "rye"],
    },
    {
      name: "Cosmopolitan",
      base: ["vodka"],
    },
    {
      name: "Martini",
      base: ["vodka", "gin"],
    },
    {
      name: "Old Fashion",
      base: ["bourbon", "whiskey", "rye"],
    },
    {
      name: "Mojito",
      base: ["rum"],
    },
    {
      name: "French 75",
      base: ["gin"],
    },
    {
      name: "Negroni",
      base: ["gin"],
    },
    {
      name: "Moscow Mule",
      base: ["vodka"],
    },
    {
      name: "White Russian",
      base: ["vodka"],
    },
    {
      name: "Lemondrop",
      base: ["vodka"],
    },
  ]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
</script>

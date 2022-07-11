<template>
  <div>
    <div class="text-2xl font-bold">Wine</div>

    <Listbox as="div" v-model="selectedFilters" multiple class="mt-6">
      <ListboxLabel
        class="block text-sm font-medium text-slate-700 dark:text-slate-500"
      >
        Assigned to
      </ListboxLabel>
      <div class="mt-1 relative">
        <ListboxButton
          class="bg-slate-900 relative w-full border border-slate-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
        >
          <div class="block truncate">Select Your Options</div>
          <span
            class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
          >
            <SelectorIcon class="h-5 w-5 text-slate-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-10 mt-1 w-full bg-white dark:bg-slate-700 shadow-2xl max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          >
            <div class="flex justify-end pr-4">
              <button
                :disabled="selectedFilters.length < 1"
                class="cursor-default select-none relative py-1 px-6 text-xs bg-slate-900 rounded-full"
                @click="selectedFilters = []"
              >
                Clear All
              </button>
            </div>

            <ListboxOption
              as="template"
              v-for="tag in availableTags"
              :key="tag"
              :value="tag"
              v-slot="{ active, selected }"
            >
              <li
                :class="[
                  active
                    ? 'text-white bg-sky-600'
                    : 'text-slate-900 dark:text-slate-100',
                  'cursor-default select-none relative py-2 pl-3 pr-9',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-semibold' : 'font-normal',
                    'block truncate',
                  ]"
                >
                  {{ capitalizeFirstLetter(tag) }}
                </span>

                <span
                  v-if="selected"
                  :class="[
                    active ? 'text-white' : 'text-sky-600 dark:text-sky-300',
                    'absolute inset-y-0 right-0 flex items-center pr-4',
                  ]"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>

    <div
      class="mt-8 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 overflow-hidden rounded-md"
    >
      <ul role="list" class="divide-y divide-slate-200 dark:divide-slate-700">
        <li
          v-for="wine in filteredWines"
          :key="wine.name"
          class="flex justify-between items-center px-6 py-4"
        >
          <div>
            <div class="font-medium">{{ wine.name }}</div>

            <div class="mt-3 text-sm text-slate-500 dark:text-slate-400">
              {{ wine.variatal }}
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div
              class="rounded-full w-3 h-3"
              :class="{
                'bg-red-500': wine.type === 'red',
                'bg-white': wine.type === 'white',
                'bg-rose-300': wine.type === 'rose',
              }"
            ></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
  } from "@headlessui/vue";

  import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";

  // Filters selected
  const selectedFilters = ref([]);

  const wines = [
    {
      name: "Corvezzo",
      type: "white",
      sparkling: true,
      variatal: "prosecco nv, veneto",
      keywords: ["light", "gas", "metallic", "sweet"],
      glass: 13,
      quart: 18.5,
      bottle: 52,
    },
    {
      name: "Paitin Rivoli",
      type: "red",
      sparkling: false,
      variatal: "dolcetto d’alba ’19 / piedmont",
      keywords: ["dark", "cherry", "oak", "chocolates"],
      glass: 12.5,
      quart: 17.5,
      bottle: 50,
      notes: "organic",
    },
    {
      name: "Bicocchi Rose",
      type: "rose",
      sparkling: false,
      variatal: "toscana rosato '20",
      keywords: ["dark", "cherry", "oak", "chocolates"],
      glass: 11.5,
      quart: 16.5,
      bottle: 46,
    },
  ];

  const availableTags = computed(() => {
    return wines.map((wine) => wine.keywords).flat();
  });

  const filteredWines = computed(() => {
    const selected = selectedFilters.value;
    const filtered = wines.filter((wine) => {
      return selected.every((tag) => wine.keywords.includes(tag));
    });
    const ordered = filtered.sort((a, b) => {
      return a.type.localeCompare(b.type);
    });
    return filtered;
  });

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
</script>

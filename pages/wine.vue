<template>
  <div>
    <div class="text-2xl font-bold">Wine</div>

    <Listbox as="div" v-model="selectedFilters" multiple class="mt-6">
      <ListboxLabel
        class="block text-sm font-medium text-slate-700 dark:text-slate-500"
      >
        Filter Wines
      </ListboxLabel>
      <div
        class="mt-1 relative flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4 lg:items-center"
      >
        <div class="relative">
          <input
            type="text"
            v-model="searchTerm"
            class="bg-slate-800 border rounded py-2 w-full"
          />
          <button
            v-show="searchTerm !== ''"
            class="absolute top-0 bottom-0 right-0 pr-2 text-slate-400"
            @click="searchTerm = ''"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div class="flex-1">
          <ListboxButton
            class="bg-slate-900 relative w-full border border-slate-700 rounded-md shadow-sm pl-3 pr-10 py-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          >
            <div class="block truncate">Filter wines by type and keywords</div>
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
              class="absolute z-10 mt-1 w-2/3 bg-white dark:bg-slate-700 shadow-2xl max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            >
              <ListboxOption
                as="template"
                v-for="type in availableTypes"
                :key="type"
                :value="type"
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
                    {{ capitalizeFirstLetter(type) }}
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

              <hr class="border-b-2 border-slate-600" />

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
      </div>
    </Listbox>

    <div
      class="mt-8 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 overflow-hidden rounded-md"
    >
      <ul role="list" class="divide-y divide-slate-200 dark:divide-slate-700">
        <li
          v-for="wine in filteredWines"
          :key="wine.name"
          class="flex justify-between items-center space-x-12 px-6 py-4"
        >
          <div>
            <div class="font-medium">{{ wine.name }}</div>
            <div
              class="flex flex-col lg:flex-row lg:items-center lg:space-x-12 mt-2 text-sm text-slate-500 dark:text-slate-300"
            >
              <span>{{ wine.variatal }}</span>

              <div
                class="flex space-x-4 text-sm text-slate-500 dark:text-slate-400"
              >
                <div>
                  Glass:
                  <strong class="text-slate-600 dark:text-slate-300">{{
                    wine.glass
                  }}</strong>
                </div>
                <div>
                  Quartini:
                  <strong class="text-slate-600 dark:text-slate-300">{{
                    wine.quart
                  }}</strong>
                </div>
                <div>
                  Bottle:
                  <strong class="text-slate-600 dark:text-slate-300">{{
                    wine.bottle
                  }}</strong>
                </div>
              </div>

              <div
                class="flex space-x-4 text-sm text-slate-500 dark:text-slate-400"
              >
                <div>{{ wine.where }}</div>
                <div>{{ wine.glassType }}</div>
                <div>{{ wine.sparkling ? "Sparkling" : "Still" }}</div>
              </div>
            </div>

            <div class="mt-3 text-sm text-slate-500 dark:text-slate-500">
              {{ wine.about }}
            </div>
            <div class="mt-3 text-sm text-slate-500 dark:text-slate-500">
              {{ wine.how }}
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
  const searchTerm = ref("");

  const availableTypes = ["red", "white", "rose"];

  const wines = [
    {
      name: "Corvezzo",
      type: "white",
      sparkling: true,
      variatal: "Prosecco",
      where: "Veneto, Italy",
      glassType: "Champagne Flute",
      how: "This wine, like all other prosecco achieves its sparkle through tank fermentation (or the Charmat method... or Metodo Martinotti in Italy). The wine undergoes a secondary fermentation through the introduction of new yeast in a large pressurized tank trapping the CO2 in the wine.",
      organic: false,
      keywords: [
        "light",
        "crisp",
        "refreshing",
        "dry",
        "peach",
        "green pear",
        "fresh apricot",
      ],
      about:
        "Owned and oberated by the Corvezzo family since 1950. Giovanni (third generation) is running the estate. Continuing the work of his father, Giovanni successfully achieved organic certification for the entire 150ha estate, making it one of the largest organic estates in Italy",
      glass: 13,
      quart: 18.5,
      bottle: 52,
    },
    {
      name: "Le Morette Cepage",
      type: "rose",
      sparkling: true,
      variatal: "Sparkling Rose",
      where: "Lugano, Italy",
      glassType: "Champagne Flute",
      how: "Blend of Corvina, Rondinella, Molinara. Stainless Steel fermentation. Charmat / Martinotti method for secondary fermentation (making it sparkling)",
      organic: true,
      keywords: [
        "light",
        "crisp",
        "refreshing",
        "dry",
        "peach",
        "green pear",
        "fresh apricot",
      ],
      about:
        "Founded in the 1960's by Gino Zenato Le Morette refers to a protected species of duck that is native to the area around Lake Frassino where the winery is located (just west of Verona, south of Lake Garda)",
      glass: 13,
      quart: 18.5,
      bottle: 52,
    },
  ];

  const availableTags = computed(() => {
    const tags = wines.map((wine) => wine.keywords).flat();
    const tagsOrdered = tags.sort((a, b) => {
      return a.localeCompare(b);
    });
    return [...new Set(tagsOrdered)];
  });

  const filteredWines = computed(() => {
    let searchedWines = [];
    if (searchTerm.value) {
      searchedWines = wines.filter((wine) => {
        return wine.name.toLowerCase().includes(searchTerm.value.toLowerCase());
      });
    } else {
      searchedWines = wines;
    }

    const selected = selectedFilters.value;
    const filtered = searchedWines.filter((wine) => {
      return selected.every(
        (tag) => wine.keywords.includes(tag) || wine.type.includes(tag)
      );
    });
    const ordered = filtered.sort((a, b) => {
      return a.type.localeCompare(b.type);
    });
    return filtered;
  });

  const clearFilters = () => {
    selectedFilters.value = [];
    searchTerm.value = "";
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
</script>

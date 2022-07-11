<template>
  <div class="w-full">
    <div class="text-2xl font-bold">Food</div>
    <div class="mt-4">
      <label
        for="dishNameFilter"
        class="block text-sm font-medium text-slate-700 dark:text-slate-500"
        >Filter by name</label
      >
      <div class="mt-1">
        <input
          type="text"
          name="dishNameFilter"
          id="dishNameFilter"
          v-model="dishFilter"
          class="dark:bg-slate-900 shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border-slate-300 dark:border-slate-700 rounded-md"
          placeholder="Example: Insalata Di Spinaci"
        />
      </div>
    </div>

    <Listbox as="div" v-model="selectedFilters" multiple class="mt-6">
      <ListboxLabel
        class="block text-sm font-medium text-slate-700 dark:text-slate-500"
      >
        Allergies and Diet filters
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
              v-for="allergy in allergyOptions"
              :key="allergy.id"
              :value="allergy"
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
                  {{ allergy.name }}
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
            <ListboxOption
              as="template"
              v-for="diet in dietOptions"
              :key="diet.id"
              :value="diet"
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
                  {{ diet.name }}
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
        <li v-for="plate in restaurantPlates" :key="plate.id" class="px-6 py-4">
          <div class="font-medium">{{ plate.name }}</div>

          <ul class="flex">
            <li v-for="(dietOption, diet) in plate.diets">
              <span
                class="inline-block rounded-full px-3 py-1 text-xs font-semibold mr-2"
                :class="{
                  'bg-slate-500 text-white': dietOption === 'can',
                  'bg-green-500 dark:bg-green-100 text-green-200 dark:text-green-600':
                    dietOption === 'is',
                }"
              >
                {{ diet }}
                <template v-if="dietOption === 'can'">(optionally)</template>
              </span>
            </li>
          </ul>

          <div class="mt-3 text-sm text-slate-500 dark:text-slate-400">
            {{ plate.ingredients }}
          </div>

          <ul class="mt-4 flex space-x-2">
            <li
              v-for="(allergenOption, allergen) in plate.allergens"
              :key="allergen"
              class="flex flex-col items-center"
            >
              <div
                v-if="allergenOption === 'must'"
                class="flex flex-col items-center text-xs text-red-500 dark:text-red-200 bg-red-100 dark:bg-red-600 rounded px-2 py-2"
              >
                <div class="flex items-center">
                  <svg
                    class="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="capitalize font-bold"> {{ allergen }}</span>
                </div>
                Cannot Remove
              </div>
              <div
                v-if="allergenOption === 'optional'"
                class="flex flex-col items-center text-xs text-teal-600 dark:text-teal-200 bg-teal-100 dark:bg-teal-700 rounded px-2 py-2"
              >
                <div class="flex items-center space-x-1">
                  <svg
                    class="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                    ></path>
                  </svg>
                  <span class="capitalize font-bold"> {{ allergen }}</span>
                </div>
                Can Remove
              </div>
            </li>
          </ul>
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

  const props = defineProps({
    currentRestaurant: {
      type: String,
      required: true,
    },
  });

  // Filter by dish name
  const dishFilter = ref("");

  // Filters selected
  const selectedFilters = ref([]);

  // What is used in the actual dropdown
  const allergyOptions = [
    { id: "gluten", name: "Gluten", type: "allergen" },
    { id: "dairy", name: "Dairy", type: "allergen" },
    { id: "nut", name: "Nut", type: "allergen" },
    { id: "soy", name: "Soy", type: "allergen" },
    { id: "seafood", name: "Seafood", type: "allergen" },
  ];

  // Used in the dropdown selector
  const dietOptions = [
    { id: "vegetarian", name: "Vegetarian", type: "diet" },
    { id: "vegan", name: "Vegan", type: "diet" },
  ];

  const allergens = ref(["gluten", "dairy", "nut", "soy", "seafood"]);
  const diets = ref(["vegetarian", "vegan"]);

  const plates = ref({
    "Osteria Mattone": [
      // Salads
      {
        name: "Insalata Di Spinaci",
        ingredients:
          "spinach, strawberries, candied walnuts, goat cheese, truffle-honey vin",
        allergens: {
          nut: "optional",
          dairy: "optional",
        },
        diets: {
          vegetarian: "is",
          vegan: "can",
        },
      },
      {
        name: "Insalata Mista",
        ingredients:
          "greens, olives, cucumbers, onion, tomato, pepperoncini, mozzarella, parmesan vin",
        allergens: {
          dairy: "optional",
        },
        diets: {
          vegetarian: "is",
          vegan: "is",
        },
      },
      {
        name: "Insalata Romana",
        ingredients: "romaine, bread crumbs, parmesan, creamy garlic dressing",
        allergens: {
          dairy: "must",
        },
        diets: {
          vegetarian: "is",
        },
      },

      // Apps
      {
        name: "Arancini",
        ingredients:
          "fried tomato risotto balls, mozzarella, balsamic, pesto aioli ",
        allergens: {
          gluten: "must",
          dairy: "must",
        },
      },
      {
        name: "Polpette",
        ingredients: "neapolitan braised veal meatballs, tomato sauce",
        allergens: {
          gluten: "must",
        },
      },
      {
        name: "Calamarti Fritti",
        ingredients: "fried squid, pepperoncini, preserved lemon, aioli ",
        allergens: {
          gluten: "must",
          dairy: "must",
        },
      },
    ],
  });

  const restaurantPlates = computed(() => {
    const restaurantPlates = plates.value[props.currentRestaurant];
    if (!restaurantPlates) {
      return [];
    }

    if (dishFilter.value) {
      return restaurantPlates.filter((plate) =>
        plate.name.toLowerCase().includes(dishFilter.value.toLowerCase())
      );
    }

    if (selectedFilters.value.length) {
      return restaurantPlates.filter((plate) => {
        const allergens = plate.allergens;
        const diets = plate.diets;
        return selectedFilters.value.every((filter) => {
          if (filter.type === "allergen") {
            if (allergens) {
              return allergens[filter.id];
            }
          } else {
            if (diets) {
              return diets[filter.id];
            }
          }
        });
      });
    }

    return restaurantPlates;
  });
</script>

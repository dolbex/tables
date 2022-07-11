<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div
    :class="{
      dark: darkMode,
    }"
  >
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="relative z-40 md:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 flex z-40">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex-1 flex flex-col max-w-xs w-full bg-slate-800"
            >
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div class="flex-shrink-0 flex items-center px-4 text-white">
                  Reckless Suggestions
                </div>
                <nav class="mt-5 px-2 space-y-1">
                  <button
                    v-for="item in navigation"
                    :key="item.name"
                    class="w-full"
                    :class="[
                      item.name === currentRestaurant
                        ? 'bg-slate-800 text-white'
                        : 'text-white hover:bg-slate-600 hover:bg-opacity-75',
                      'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                    ]"
                    :style="{
                      backgroundColor:
                        item.name === currentRestaurant
                          ? item.color
                          : 'transparent',
                    }"
                    @click="currentRestaurant = item.name"
                  >
                    <component
                      :is="item.icon"
                      class="mr-4 flex-shrink-0 h-6 w-6 text-slate-300"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </button>
                </nav>
              </div>
              <div class="flex-shrink-0 flex border-t border-slate-700 p-4">
                <a href="#" class="flex-shrink-0 group block">
                  <div class="flex">
                    <button
                      class="inline-block rounded-full p-2"
                      :class="{
                        'bg-slate-700 text-sky-300': darkMode,
                        'bg-white text-slate-400': !darkMode,
                      }"
                      @click="darkMode = !darkMode"
                    >
                      <svg
                        class="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </a>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="flex-shrink-0 w-14" aria-hidden="true">
            <!-- Force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex-1 flex flex-col min-h-0 bg-slate-100 dark:bg-slate-900">
        <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div
            class="flex items-center flex-shrink-0 px-4 text-slate-600 dark:text-white"
          >
            Reckless Suggestions
          </div>
          <nav class="mt-5 flex-1 px-2 space-y-1">
            <button
              v-for="item in navigation"
              :key="item.name"
              :class="[
                item.name === currentRestaurant
                  ? 'bg-sky-500 text-white'
                  : 'text-slate-400 dark:text-slate-400 hover:bg-slate-600 hover:bg-opacity-75',
                'group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md',
              ]"
              :style="{
                backgroundColor:
                  item.name === currentRestaurant ? item.color : 'transparent',
              }"
              @click="currentRestaurant = item.name"
            >
              <component
                :is="item.icon"
                class="mr-3 flex-shrink-0 h-6 w-6 text-slate-300"
                aria-hidden="true"
              />
              {{ item.name }}
            </button>
          </nav>
        </div>
        <div
          class="flex-shrink-0 flex border-t border-slate-300 dark:border-slate-800 p-4"
        >
          <a href="#" class="flex-shrink-0 w-full group block">
            <div class="flex">
              <button
                class="inline-block rounded-full p-2"
                :class="{
                  'bg-slate-700 text-sky-300': darkMode,
                  'bg-white text-slate-400': !darkMode,
                }"
                @click="darkMode = !darkMode"
              >
                <svg
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                  ></path>
                </svg>
              </button>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div
      class="md:pl-64 flex flex-col flex-1 bg-gray-100 dark:bg-slate-800 h-screen overflow-y-scroll"
    >
      <div
        class="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100 dark:bg-slate-900"
      >
        <button
          type="button"
          class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <MenuIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <main class="flex-1 flex flex-col">
        <div class="flex-1 flex flex-col py-6">
          <div class="max-w-7xl px-4 sm:px-6 md:px-8 flex flex-col flex-1">
            <NuxtPage
              class="flex-1 text-slate-800 dark:text-slate-300 pb-20"
              :current-restaurant="currentRestaurant"
            />

            <div
              class="fixed bottom-0 left-0 right-0 px-8 py-2 dark:bg-slate-00"
            >
              <PageNavigation />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
  } from "@headlessui/vue";
  import {
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    MenuIcon,
    UsersIcon,
    XIcon,
  } from "@heroicons/vue/outline";

  import "@/assets/css/tailwind.css";

  useHead({
    title: "Reckless Suggestions",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    charset: "utf-8",
    meta: [{ name: "description", content: "Reckless Suggestions" }],
    htmlAttrs: {
      class: "h-full bg-gray-100",
    },
    bodyAttrs: {
      class: "test",
    },
  });

  const navigation = [
    { name: "Osteria Mattone", color: "#900f1c" },
    { name: "Casa Robles", color: "#1E48D8" },
  ];

  const sidebarOpen = ref(false);
  const darkMode = ref(true);
  const currentRestaurant = ref("Osteria Mattone");
</script>

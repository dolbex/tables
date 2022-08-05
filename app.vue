<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div
    class="grid grid-cols-12 h-screen"
    :class="{
      dark: darkMode,
    }"
  >
    <div class="col-span-9 dark:bg-slate-800 dark:text-slate-300">
      <FloorplanDiagram />
    </div>

    <div
      class="col-span-3 overflow-y-scroll dark:bg-slate-900 dark:text-slate-400"
    >
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  import "@/assets/css/tailwind.css";

  useHead({
    title: "Tables",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    charset: "utf-8",
    meta: [{ name: "description", content: "Tables" }],
    htmlAttrs: {
      class: "h-full bg-gray-100",
    },
  });

  const navigation = [
    { name: "Today's Tasks", routeName: "index" },
    { name: "All Tasks", routeName: "all-tasks" },
    { name: "Completed Tasks", routeName: "completed-tasks" },
    { name: "New Task", routeName: "new-task" },
    { name: "Edit Task", routeName: "edit-task" },
    { name: "Remove Task", routeName: "remove-task" },
  ];

  const sidebarOpen = ref(false);
  const darkMode = ref(true);
  const currentPage = ref("index");
</script>

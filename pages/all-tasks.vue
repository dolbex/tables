<template>
  <div class="p-8">
    <h1 class="text-xl uppercase">All Tasks</h1>
    <button @click="writeToFirestore">Test</button>
  </div>
</template>

<script setup lang="ts">
  import db from "~/plugins/firebase.js";
  import { doc, setDoc } from "firebase/firestore";

  const writeToFirestore = async () => {
    const ref = doc(db, "testCollection", "testDoc");
    const document = {
      text: "Firebase 9 rocks!",
    };
    try {
      console.log("here 1");
      await setDoc(ref, document);
      alert("Success!");
      console.log("here 2");
    } catch (e) {
      console.log("here 3");
      alert("Error!");
      console.error(e);
    }
  };
</script>

<script setup>
defineProps(["question", "answers-count"]);
</script>

<template>
  <article>
    <main class="p-2 border-2 border-lime-500 rounded">
      <p>{{ question }}</p>
      <small class="text-sm text-lime-500"
        >{{ answersCount }} answer{{ answersCount === 1 ? "" : "s" }}</small
      >
    </main>
  </article>
</template>

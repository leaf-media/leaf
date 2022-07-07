<script setup>
defineProps(["question", "answers-count"]);
</script>

<template>
  <article>
    <p>{{ question }}</p>
    <small>{{ answersCount }} answer{{ answersCount === 1 ? "" : "s" }}</small>
  </article>
</template>

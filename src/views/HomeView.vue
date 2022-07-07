<script setup>
import { ref } from "vue";
import QuestionItem from "@/components/QuestionItem.vue";

const sections = ref(null);
async function loadSections() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  sections.value = [
    {
      topic: "technology",
      questions: [
        {
          question: "hhh",
          answersCount: 5,
        },
      ],
    },
  ];
}

loadSections();
</script>

<template>
  <main>
    <section v-for="{ topic, questions } in sections" :key="topic">
      <header>
        <h2>{{ topic }} arrow-right</h2>
        <p>Curious about {{ topic }}? We've got you covered!</p>
      </header>
      <main>
        <QuestionItem
          v-for="{ question, answersCount } in questions"
          :key="question"
          :question="question"
          :answers-count="answersCount"
        />
      </main>
    </section>
  </main>
</template>

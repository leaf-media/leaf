<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import QuestionItem from "@/components/QuestionItem.vue";
import useItems from "@/composables/useItems";

const { allQuestions } = useItems();

const questions = ref(null);
async function loadSections() {
  questions.value = await allQuestions();
  console.log(questions.value);
}

loadSections();
</script>

<template>
  <main class="min-h-screen mx-2 mt-12">
    <!-- Starting heading -->
    <header>
      <h2 class="text-2xl font-bold text-lime-500 text-center">
        Welcome to leaf!
      </h2>
      <p class="text text-center">
        We’re the Internet’s largest open-source community for all questions and
        answers.
      </p>
    </header>

    <!-- Question -->
    <section class="mt-12 mb-5 space-y-3">
      <header>
        <h3 class="text-lg font-bold text-lime-500">Questions</h3>
      </header>

      <main v-if="questions">
        <router-link
          class="button my-2 block"
          :to="{ name: 'question', params: { id } }"
          v-for="{ id, text } in questions"
          :key="id"
        >
          <QuestionItem :question="text" :answers-count="12" />
        </router-link>
      </main>

      <main v-else>
        <p>Loading...</p>
      </main>
    </section>
  </main>
</template>

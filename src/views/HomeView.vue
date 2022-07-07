<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import QuestionItem from "@/components/QuestionItem.vue";

const questions = ref(null);
async function loadSections() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  questions.value = [
    {
      id: "55cd5",
      text: "hhh",
      answersCount: 5,
    },
  ]
}

loadSections();
</script>

<template>
   <main class="min-h-screen mx-2 mt-12">
      <!-- Starting heading -->
      <header>
          <h2 class="text-2xl font-bold text-lime-500 text-center">Welcome to leaf!</h2>
          <p class="text text-center">
            We’re the Internet’s largest open-source community for all
              questions and
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
            class="button"
              :to="{ name: 'question', params: { id } }"
              v-for="{ id, text, answersCount } in questions"
              :key="id"
            >
              <QuestionItem
                :question="text"
                :answers-count="answersCount"
              />
            </router-link>
          </main>

          <main v-else>
            <p>Loading...</p>
          </main>
      </section>
    </main>
</template>

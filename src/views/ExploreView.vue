<script setup>
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import Chippy from "@/components/ChipInput.vue";
import QuestionItem from "@/components/QuestionItem.vue";

const route = useRoute();

const search = ref("");
const sortBy = ref("ascending");
watch(
  () => route.query.q,
  (query) => {
    search.value = query;
  },
  { immediate: true }
);

const isSearching = ref(false);
const searchResults = computed(() =>
  Array(15).fill({
    question:
      "What is an interesting fact that deserves to be disclosed about Nikola Tesla?",
    answersCount: 18,
  })
);

const chippy = ref(null);
//const topics = computed(() => chippy.value.chips.value);

const focusInput = () => chippy.value.focus();
function onDeleteChip() {
  focusInput();
}
</script>

<template>
  <form @submit.prevent>
    <input type="search" v-model="search" class="sm:hidden" />

    <Chippy
      ref="chippy"
      @delete:chip="onDeleteChip"
      :autocomplete="['html', 'science']"
      label="Topics:"
      placeholder="Technology"
    />

    <fieldset>
      <legend>Sort by popularity:</legend>

      <div>
        <label for="ascending">ascending</label>
        <input
          type="radio"
          name="sort"
          id="ascending"
          value="ascending"
          selected
          v-model="sortBy"
        />
      </div>
      <div>
        <label for="descending">descending</label>
        <input
          type="radio"
          name="sort"
          id="descending"
          value="descending"
          v-model="sortBy"
        />
      </div>
    </fieldset>
  </form>

  <p v-if="isSearching">Searching...</p>

  <ul>
    <li v-for="{ question, answersCount } in searchResults" :key="question">
      <QuestionItem :question="question" :answers-count="answersCount" />
    </li>
  </ul>
</template>

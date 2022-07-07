<script setup>
import { ref, onMounted } from "vue";
import { onClickOutside } from "@vueuse/core";
import Chippy from "@/components/ChipInput.vue";

const question = ref("");

const topics = ref(null);

onMounted(() => {
  focusInput();
});

const focusInput = () => topics.value.focus();
const clearChips = () => topics.value.clearChips();

function clearAll() {
  clearChips();
  focusInput();
}

function onDeleteChip() {
  focusInput();
}

function onSubmit() {
  close();
}

const container = ref(null);
onClickOutside(container, close);

const emit = defineEmits(["close"]);
function close() {
  emit("close");
}
</script>

<template>
  <dialog open ref="container">
    <form @submit.prevent="onSubmit">
      <label for="question">Add a question:</label>
      <input id="question" v-model="question" />

      <div>
        <Chippy
          ref="topics"
          @delete:chip="onDeleteChip"
          :autocomplete="['html', 'science']"
          label="Topics:"
          placeholder="Technology"
        />

        <div class="mt-1 space-x-1">
          <button
            class="underline text-stone-50 text-sm"
            title="Clear all"
            @click="clearAll"
          >
            clear
          </button>
        </div>
      </div>

      <button type="submit">Create</button>
    </form>
  </dialog>
</template>

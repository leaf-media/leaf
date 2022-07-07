<script setup>
import { ref, onMounted } from "vue";
import { onClickOutside } from "@vueuse/core";

const question = ref("");

function onSubmit() {
  close();
  // TODO: redirect to question page
}

const input = ref(null)
onMounted(() => input.value.focus())

const container = ref(null);
onClickOutside(container, close);

const emit = defineEmits(["close"]);
function close() {
  emit("close");
}
</script>

<template>
  <dialog open ref="container" class="
  fixed top-12 bg-lime-500 shadow rounded">
    <form @submit.prevent="onSubmit">
      <label for="question" class="font-bold text-white">Add a question:</label>
      <input id="question" v-model="question" class="bg-transparent placeholder:text-white text-white border-white shadow-white! block border-[1px] mt-1 rounded border-black px-1 py-2" placeholder="Question" ref="input" />

      <button type="submit" class="mt-8 button block w-full bg-white font-bold text-lime-500 rounded py-1">Create</button>
    </form>
  </dialog>
</template>

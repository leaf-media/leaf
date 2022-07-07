<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { onClickOutside } from "@vueuse/core";

defineProps(["user"]);
const emit = defineEmits(["close", "new-question", "sign-out"]);
const showNewQuestionModal = () => emit("new-question");
const signOut = () => emit("sign-out");
const close = () => emit("close");

const container = ref(null);
onClickOutside(container, close);
</script>

<template>
  <dialog
    open
    class="sm:hidden fixed top-12 left-auto right-2 w-fit m-0 bg-lime-500 rounded flex flex-col text-white items-start gap-2 shadow-lg w-72"
    ref="container"
  >
    <router-link :to="{ name: 'signin' }" v-if="!user">Sign In</router-link>
    <button @click="signOut" v-else>Sign Out</button>

    <button @click="showNewQuestionModal">Add question</button>
  </dialog>
</template>

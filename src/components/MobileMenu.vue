<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { onClickOutside } from "@vueuse/core";

defineProps(["modelValue", "user"]);
const emit = defineEmits([
  "close",
  "new-question",
  "sign-out",
  "update:modelValue",
]);
const showNewQuestionModal = () => emit("new-question");
const signOut = () => emit("sign-out");
const close = () => emit("close");

const container = ref(null);
onClickOutside(container, close);
</script>

<template>
  <dialog open class="sm:hidden" ref="container">
    <router-link :to="{ name: 'signin' }" v-if="!user">Sign In</router-link>
    <button @click="signOut" v-else>Sign Out</button>

    <button>Explore</button>
    <button @click="showNewQuestionModal">Add question</button>

    <hr />

    <form @submit.prevent>
      <input
        type="search"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </form>
  </dialog>
</template>

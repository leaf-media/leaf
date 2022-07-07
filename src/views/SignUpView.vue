<script setup>
import { ref, watch } from "vue";
import { RouterLink, useRouter } from "vue-router";
import useAuth from "@/composables/useAuth";

const { user, signUp } = useAuth();

// Submit the email and password to auth service
const email = ref("");
const password = ref("");

async function onSubmit() {
  await signUp(email.value, password.value);
}

// Redirect to main page once signed up
const router = useRouter();

watch(user, (newUser) => {
  if (newUser) {
    router.push({ name: "home" });
  }
});
</script>

<template>
  <main class="mx-2 mt-12">
    <h2 class="font-bold">Sign up</h2>
    <form @submit.prevent="onSubmit">
      <input
        class="block my-2 border-[1px] rounded py-2 px-1 w-full bg-transparent"
        required
        type="email"
        id="email"
        v-model="email"
        placeholder="Email"
      />

      <input
        class="block my-2 border-[1px] rounded py-2 px-1 w-full bg-transparent"
        required
        type="password"
        id="password"
        v-model="password"
        placeholder="Password"
      />

      <button
        type="submit"
        class="block w-full bg-lime-500 text-white font-bold py-2 rounded"
      >
        Sign Up
      </button>
    </form>
    <p class="mt-2 text-sm">
      Already a leaf member?
      <router-link
        class="hover:underline text-lime-500"
        :to="{ name: 'signin' }"
        >Sign In</router-link
      >
    </p>
  </main>
</template>

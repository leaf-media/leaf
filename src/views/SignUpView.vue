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
  <main>
    <form @submit.prevent="onSubmit">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" />

      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />

      <button type="submit">Sign Up</button>
    </form>
    <p>
      Already a leaf member? <router-link :to="{name: 'signin'}">Sign In</router-link>
    </p>
  </main>
</template>

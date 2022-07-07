<script setup>
import { ref } from "vue";
import useAuth from "@/composables/useAuth";
import NewQuestion from "@/components/NewQuestion.vue";
import MobileMenu from "@/components/MobileMenu.vue";

const { user, signOut } = useAuth();

const isMobileMenuOpen = ref(false);
const isNewQuestionModalOpen = ref(false);

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}
function showNewQuestionModal() {
  isNewQuestionModalOpen.value = true;
  toggleMobileMenu();
}
function closeNewQuestionModal() {
  isNewQuestionModalOpen.value = false;
}

const search = ref("");
</script>

<template>
  <header>
    <router-link :to="{ name: 'home' }"><h1>leaf</h1></router-link>
    <div class="sm:hidden">
      <button @click="toggleMobileMenu">
        <span v-if="isMobileMenuOpen">close</span>
        <span v-else>menu</span>
      </button>
    </div>
    <div class="hidden sm:block">
      <form @submit.prevent>
        <input type="search" v-model="search" />
      </form>

      <button @click="showNewQuestionModal">Add question</button>

      <router-link :to="{ name: 'signin' }" v-if="!user">user</router-link>
      <button @click="signOut" v-else>user</button>
    </div>

    <Teleport to="body">
      <MobileMenu
        v-if="isMobileMenuOpen"
        @close="toggleMobileMenu"
        @new-question="showNewQuestionModal"
        @sign-out="signOut"
        :user="user"
        v-model="search"
      />

      <NewQuestion
        v-if="isNewQuestionModalOpen"
        @close="closeNewQuestionModal"
      />
    </Teleport>
  </header>
</template>

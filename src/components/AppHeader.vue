<script setup>
import { ref } from "vue";
import useAuth from "@/composables/useAuth";
import NewQuestion from "@/components/NewQuestion.vue";
import MobileMenu from "@/components/MobileMenu.vue";
import LeafLogo from "@/components/LeafLogo.vue";

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
</script>

<template>
  <header class="mt-1">
    <!-- navigation -->
    <nav class="px-4 flex justify-between items-center gap-4">
      <div>
        <router-link :to="{ name: 'home' }"
          ><h1><LeafLogo class="w-[5rem]" /></h1
        ></router-link>
      </div>

      <div class="flex items-center gap-4">
        <!-- Add question btn -->
        <button
          @click="showNewQuestionModal"
          class="button hidden sm:block px-5 text-white h-8 bg-lime-500 rounded-3xl font-light"
        >
          + Add question
        </button>

        <button class="sm:hidden" @click="toggleMobileMenu" title="Toggle menu">
          <font-awesome-icon
            v-if="!isMobileMenuOpen"
            icon="fa-solid fa-ellipsis-vertical"
            class="text-lime-500"
            size="lg"
          />
          <font-awesome-icon
            v-else
            icon="fa-solid fa-xmark"
            class="text-lime-500"
            size="lg"
          />
        </button>

        <button
          class="hidden sm:block"
          title="Sign Out"
          v-if="user"
          @click="signOut"
        >
          <font-awesome-icon
            icon="fa-solid fa-user-xmark"
            class="text-lime-500"
            size="xl"
          />
        </button>
        <router-link
          class="hidden sm:block"
          title="Sign In"
          :to="{ name: 'signin' }"
          v-else
        >
          <font-awesome-icon
            icon="fa-solid fa-user-plus"
            class="text-lime-500"
            size="xl"
          />
        </router-link>
      </div>
    </nav>

    <Teleport to="body">
      <MobileMenu
        v-if="isMobileMenuOpen"
        @new-question="showNewQuestionModal"
        @sign-out="signOut"
        :user="user"
      />

      <NewQuestion
        v-if="isNewQuestionModalOpen"
        @close="closeNewQuestionModal"
      />
    </Teleport>
  </header>
</template>

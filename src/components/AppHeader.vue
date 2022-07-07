<script setup>
	import { ref } from "vue";
	import { RouterLink } from "vue-router";
	import useAuth from "@/composables/useAuth";

	const { user, signOut } = useAuth();

	const isMobileMenuOpen = ref(false);

	function toggleMobileMenu() {
		isMobileMenuOpen.value = !isMobileMenuOpen.value
	}

	const search = ref("");
</script>

<template>
	<header>
	    <router-link :to="{name: 'home'}"><h1>leaf</h1></router-link>
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

			<button>Add question</button>

			<router-link :to="{name: 'signin'}" v-if="!user">user</router-link>
			<button @click="signOut" v-else>user</button>
	    </div>

	    <Teleport to="body">
	    	<dialog :open="isMobileMenuOpen" class="sm:hidden">
	    		<router-link :to="{name: 'signin'}" v-if="!user">Sign In</router-link>
	    		<button @click="signOut" v-else>Sign Out</button>

	    		<button>Explore</button>
	    		<button>Add question</button>

	      		<hr />

	      		<form @submit.prevent>
	      			<input type="search" v-model="search" />
	      		</form>
	    	</dialog>
	    </Teleport>
	</header>
</template>
<script setup>
	import { ref, watch, reactive } from 'vue'
	import { useRoute, RouterLink } from 'vue-router'

	import useAuth from "@/composables/useAuth";

	const { user } = useAuth();


	const route = useRoute()
	const questionID = ref(null)
	watch(() => route.params.id, (id) => questionID.value = id, { immediate: true })


	const headerData = reactive({
		branches: [],
		question: '',
		author: ''
	})
	const answers = ref(null)

	async function loadData() {
		await new Promise(resolve => setTimeout(resolve, 2000))

		headerData.question = 'jij?'
		headerData.author = 'e'

		answers.value = [
			{
				answer: 'oij',
				author: 'i',
				upvotes: ref(5),
				downvotes: ref(1),
				isUpvoted: ref(false),
				isDownvoted: ref(false)
			}
		]
	}
	loadData()

	function toggleUpvote(answer) {
		if (answer.isDownvoted) {
			answer.downvotes --
			answer.isDownvoted = false
		}
		answer.isUpvoted = !answer.isUpvoted

		if (answer.isUpvoted) answer.upvotes++ 
		else answer.upvotes-- 
	}
	function toggleDownvote(answer) {
		if (answer.isUpvoted) {
			answer.upvotes --
			answer.isUpvoted = false
		}
		answer.isDownvoted = !answer.isDownvoted

		if (answer.isDownvoted) answer.downvotes++ 
		else answer.downvotes-- 
	}


	const newAnswer = ref('')
	async function onSubmit() {
		answers.value.unshift({
			answer: newAnswer.value,
			author: user.value.email,
			upvotes: ref(5),
			downvotes: ref(1),
			isUpvoted: ref(false),
			isDownvoted: ref(false)
		})

		newAnswer.value = ''
	}


	watch(questionID, loadData)
</script>

<template>
	<main class="mx-2 mt-12" v-if="answers">
		<header>
			<h2 class="font-bold text-xl">{{ headerData.question }}</h2>
			<small class="text-xs">by <span class="underline">{{ headerData.author }}</span></small>
		</header>

		<main class="mt-24">
			<div class="mb-4">
				<form @submit.prevent="onSubmit" v-if="user">
					<textarea v-model="newAnswer" class="border-2 border-lime-500 w-full bg-transparent rounded resize-none" placeholder="Add answer..." ></textarea>
					<button type="submit" class="bg-lime-500 font-bold text-white block py-1 w-full rounded">Submit</button>
				</form>
					<p v-else><router-link class="text-lime-500 hover:underline" :to="{name: 'signin'}">Sign In</router-link> to answer.</p>
			</div>

			<article 
			class="flex my-8"
			v-for="answer in answers">
				<main class="order-2 border-l-2 border-lime-500 pl-2">
					<h3 class="text-lime-500">{{ answer.author }}</h3>
					<p>{{ answer.answer }}</p>
				</main>
				<aside class="w-12 flex flex-col items-center">
					<button title="Upvote" @click="toggleUpvote(answer)">
            			<font-awesome-icon icon="fa-solid fa-caret-up" 
            			:class="`${answer.isUpvoted ? 'text-lime-500' : 'text-black'}`" size="xl" />
					</button>

					<p>{{ answer.upvotes - answer.downvotes }}</p>

					<button title="Downvote" @click="toggleDownvote(answer)">
            			<font-awesome-icon icon="fa-solid fa-caret-down" 
            			:class="`${answer.isDownvoted ? 'text-lime-500' : 'text-black'}`" size="xl" />
					</button>
				</aside>
			</article>
		</main>
	</main>
	<main v-else class="mx-2 mt-12">
		<p>Loading...</p>
	</main>
</template>
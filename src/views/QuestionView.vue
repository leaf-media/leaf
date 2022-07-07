<script setup>
	import { ref, watch, reactive } from 'vue'
	import { useRoute, RouterLink } from 'vue-router'

	import useAuth from "@/composables/useAuth";

	const { user } = useAuth();


	const route = useRoute()
	const questionID = ref(null)
	watch(() => route.params.id, (id) => questionID.value = id, { immediate: true })


	const isLoading = ref(false)
	const headerData = reactive({
		branches: [],
		question: '',
		author: ''
	})
	const answers = ref(null)

	async function loadData() {
		await new Promise(resolve => setTimeout(resolve, 2000))

		headerData.branches = ['tech', 'science']
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

		isLoading.value = false
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
			author: user.value.displayName,
			rating: 1,
			isUpvoted: ref(true),
			isDownvoted: ref(false)
		})

		newAnswer.value = ''
	}


	watch(questionID, loadData)
</script>

<template>
	<main v-if="!isLoading">
		<header>
			<ul>
				<li v-for="branch in headerData.branches" :key="branch">
					{{ branch }}
				</li>
			</ul>
			<h1>{{ headerData.question }}</h1>
			<small>by {{ headerData.author }}</small>
		</header>

		<main>
			<form @submit.prevent="onSubmit" v-if="user">
				<textarea v-model="newAnswer" :disabled="isLoading" />
				<button type="submit">Submit</button>
			</form>
			<div v-else>
				<p><router-link :to="{name: 'signin'}">Sign In</router-link> to answer.</p>
			</div>

			<article v-for="answer in answers">
				<header>
					<h2>{{ answer.author }}</h2>
				</header>
				<main>
					<p>{{ answer.answer }}</p>
				</main>
				<aside>
					<button @click="toggleUpvote(answer)">upvote</button>
					<p>{{ answer.upvotes - answer.downvotes }}</p>
					<button @click="toggleDownvote(answer)">downvote</button>
				</aside>
			</article>
		</main>
	</main>
	<main v-else>
		<p>Loading...</p>
	</main>
</template>
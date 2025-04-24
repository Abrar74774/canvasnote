<script lang="ts" setup>
import router from '@/router/index.js';
import { useUserStore } from '@/store/user';
import { ref } from 'vue';
const user = useUserStore()

const email = ref('')
const password = ref('')

const login = async () => {
	await user.login(email.value, password.value)
	router.push('/dashboard')
}
</script>

<template>
	<div class="container max-w-full mx-auto py-24 px-6">
		<div class="font-sans max-w-sm mx-auto px-6 relative flex flex-wrap">
			<div class="w-full relative mt-6">
				<div class="text-center font-semibold text-black text-xl">
					Login to your Dashboard
				</div>

				<form class="mt-8" @submit.prevent="login">
					<div class="mx-auto max-w-lg">
						<div class="py-2">
							<span class="px-1 text-sm text-gray-600">Email</span>
							<input placeholder="" type="text" v-model="email"
								class="text-md block px-3 py-2  rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none">
						</div>
						<div class="py-2">
							<span class="px-1 text-sm text-gray-600">Password</span>
							<div class="relative">
								<input placeholder="" v-model="password"
									class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none">
								<div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
								</div>
							</div>
						</div>
						<button type="submit" class="btn w-full">
							Login
						</button>
					</div>
				</form>

			</div>
		</div>
	</div>
</template>
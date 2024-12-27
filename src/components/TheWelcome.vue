<script lang="ts" setup>
import { useAuthStore } from '@/store/auth.js';

const auth = useAuthStore()

</script>


<template>
  <header class="hero h-screen bg-gray-800 text-white flex justify-center items-center">
    <div>
      <h1 class="text-4xl text-center font-bold lg:text-6xl">
        Welcome {{ auth.isLoggedIn ? auth.user?.username : 'to Canvasnote' }}
      </h1>
      <h2 class="text-xl text-center mt-3">
        Your Personal Drawing and Markup Tool 📝
      </h2>
      <div class="mt-10 flex justify-center">
        <router-link to="/dashboard">
          <button class="btn w-44 mx-2">
            Get Started
          </button>
        </router-link>
        <template v-if="!auth.isLoggedIn">
          <router-link to="/login">
            <button class="btn w-44 mx-2">
              Login
            </button>
          </router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<template>
  <header class="hero h-screen bg-gray-800 text-white flex justify-center items-center">
    <div>
      <h1 class="text-4xl font-bold lg:text-6xl">Welcome to Canvasnote</h1>
      <h2 class="text-xl text-center mt-3">Your Personal Drawing and Markup Tool 📝</h2>
      <div class="mt-10 flex justify-center">
        <router-link to="/dashboard">
          <button class="btn w-44 mx-2">
            Get Started
          </button>
        </router-link>
      </div>
    </div>
  </header>
</template>

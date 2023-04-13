<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

const serverURL = 'http://localhost:8080' //'https://canvasnote-backend.onrender.com/'

onMounted(() => {
  fetch(serverURL)
    .then(res => res.text())
    .then(text => console.log(text))
    .catch(err => console.log(err))
})
</script>

<template>
  <RouterView />
</template>
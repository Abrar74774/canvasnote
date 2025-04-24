<script setup lang="ts">
import { onMounted } from 'vue';
import {  RouterView } from 'vue-router'
import { useUserStore } from './store/user';

const user = useUserStore()
onMounted(() => {
  user.loadUserData()
})
</script>

<template>
  <RouterView />
</template>
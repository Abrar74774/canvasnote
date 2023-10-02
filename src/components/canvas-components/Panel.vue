<template>
    <div class="h-50 w-full rounded-md mx-auto my-3 shadow-lg bg-gray-200">
        <div class="flex p-2 m-2 items-center ">
            <div v-for="color of colors" @click="$emit('changeColor', color)" :style="{backgroundColor: color }" class="w-8 h-8 rounded-full m-1 cursor-pointer"></div>
            <button @click="$emit('clear')" class="bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-4 ml-auto rounded">Clear</button>
        </div>
    </div>
</template>


<script lang="ts" setup>


const emits = defineEmits(['changeColor', 'changeWidth', 'clear']);
const colors = ['black', '#EB5353', '#F9D923', '#36AE7C', '#187498', 'white']
</script>
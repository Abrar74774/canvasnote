<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import Canvas from './../components/canvas-components/Canvas.vue'


const canvas = ref()
const state = reactive({ canvasList: [
    {
        name: "Canvas-1",
        dataUrl: ""
    },
    {
        name: "Canvas-2",
        dataUrl: ""
    },
    {
        name: "Canvas-3",
        dataUrl: ""
    },
]});

const currentCanvas = ref(state.canvasList[0].name);

const saveCanvas = (dataUrl: string) => {
    const current = state.canvasList.find(canvas => canvas.name === currentCanvas.value);
    if (current) current.dataUrl = dataUrl;
}

const loadCanvas = (canvasName: string) => {
    currentCanvas.value = canvasName;
    const current = state.canvasList.find(canvas => canvas.name === canvasName);
    if (current) {
        canvas.value.loadCanvas(current.dataUrl);
        console.log(current.dataUrl)
    } 
}

onMounted(() => {
    state.canvasList.forEach(note => {
        currentCanvas.value = note.name;
        canvas.value.saveCanvas()
    })
    currentCanvas.value = state.canvasList[0].name;
})



</script>
<template>
    <div class="flex">
        <aside class="w-64 z-40 h-screen">
            <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul class="space-y-2">
                    <li>
                        <div
                            class="text-center m-1 p-3  text-base font-normal rounded-lg text-black dark:text-white bg-gray-100 dark:bg-gray-700">
                            Canvasnote</div>
                    </li>
                    <li>
                        <div 
                            class=" text-center flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                            <span class="flex-1 whitespace-nowrap">Canvases</span>
                        </div>
                    </li>
                    <li>
                        <div v-for="canvas of state.canvasList"
                            @click="loadCanvas(canvas.name)"
                            class="cursor-pointer text-center flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <span class="flex-1 whitespace-nowrap">{{canvas.name}}</span>
                        </div>
                    </li>

                    <!-- Add button -->
                    <li class="flex justify-center">
                        <button type="button" class="btn font-medium rounded-full text-sm p-2.5 text-center items-center mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                class="bi bi-plus" viewBox="0 0 16 16">
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                            <span class="sr-only">Icon description</span>
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
        <Canvas ref="canvas" @save="saveCanvas" current-canvas={{currentCanvas}} />
    </div>
</template>

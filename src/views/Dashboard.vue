<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick, watch, computed } from 'vue'
import Canvas from './../components/canvas-components/Canvas.vue'
import { saveData, loadData } from '../api'
import { useUserStore } from '@/store/user';

const user = useUserStore()

const state = reactive({
    canvasList: [
        {
            name: "Canvas 1",
            dataUrl: ""
        },
        {
            name: "Canvas 2",
            dataUrl: ""
        },
        {
            name: "Canvas 3",
            dataUrl: ""
        },
    ],
});

const activeState = reactive({
    currentIndex: 0,
    editing: -1
})

const canvas = ref()
const currentCanvas = ref(state.canvasList[0].name);

const ofUser = computed(() => {
    return user.isLoggedIn ? user.data?.username + "'s" : ''
})

const saveCanvas = async (dataUrl: string) => {
    const current = state.canvasList.find(canvas => canvas.name === currentCanvas.value);
    if (current) {
        current.dataUrl = dataUrl;
    }
}

const addCanvas = () => {
    state.canvasList.push({
        name: "Canvas " + (state.canvasList.length + 1),
        dataUrl: ""
    })
}

const deleteCanvas = (name: string) => {
    const index = state.canvasList.findIndex(canvas => canvas.name === name)
    if (index >= 0) {
        state.canvasList.splice(index, 1);
    }
}

// Improve changing canvas here - something feels redundant
const loadCanvas = (canvasName: string, index: number) => {
    activeState.currentIndex = index;
    currentCanvas.value = canvasName;
    const current = state.canvasList.find(canvas => canvas.name === canvasName);
    if (current) {
        canvas.value.loadCanvas(current.dataUrl);
    }
}

const startEdit = async (i: number) => {
    activeState.editing = i;
    await nextTick();
    document.getElementById("inp")?.focus();
}

onMounted(() => {
    const previousList = loadData();
    if (previousList.length) {
        console.log(previousList)
        state.canvasList = previousList
    }
    loadCanvas(state.canvasList[0].name, 0)
})

watch(state, (newState) => {
    saveData(newState.canvasList)
})
</script>  

<template>
    <div class="flex relative" @click="activeState.editing = -1">
        <div class="absolute top-0 right-0 p-2 z-10">
            <button v-if="user.isLoggedIn" @click="user.logout" class="btn cursor-pointer text-sm py-1 px-3">
                Logout
            </button>
            <router-link v-else to="/login">
                <button class="btn bg-green-400 hover:bg-green-300 text-black cursor-pointer text-sm py-1 px-3">
                    Login
                </button>
            </router-link>
        </div>
        <aside class="w-64 z-40 h-screen">
            <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul class="space-y-2">
                    <li>
                        <div
                            class="text-center m-1 p-3  text-base font-normal rounded-lg text-black dark:text-white bg-gray-100 dark:bg-gray-700">
                            {{ ofUser }} Canvas </div>
                    </li>
                    <li> <!-- Header -->
                        <div
                            class=" text-center flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                            <span class="flex-1 whitespace-nowrap">Canvases</span>
                        </div>
                    </li>
                    <li> <!-- Canvases -->
                        <div v-for="(canvas, i) of state.canvasList" @click="loadCanvas(canvas.name, i)"
                            v-bind:key="canvas.name" :class="{ 'bg-gray-700': i === activeState.currentIndex }"
                            class="cursor-pointer text-center flex items-center justify-between p-2 mt-1 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <div class="flex-1 whitespace-nowrap p-2">
                                <form action="#" @submit.prevent="activeState.editing = -1"
                                    v-if="i == activeState.editing">
                                    <input class="text-black bg-inherit text-inherit w-full text-center"
                                        @focus="(e: any) => e.target.select()" @click.stop=""
                                        @change="(e: any) => canvas.name = e.target.value"
                                        v-model="state.canvasList[i].name" type="text">
                                </form>
                                <div v-if="i !== activeState.editing">
                                    {{ canvas.name }}
                                </div>
                            </div>
                            <div class="flex-2 flex ml-auto">
                                <button @click.stop="startEdit(i)"
                                    class=" bg-gray-600 hover:bg-gray-500 font-medium rounded-full text-sm p-2 ml-1 w-10 h-10">
                                    ✏️
                                </button>
                                <button @click.stop="deleteCanvas(canvas.name)"
                                    class="bg-gray-600 hover:bg-gray-500 font-medium rounded-full text-sm p-2 ml-1 w-10 h-10">
                                    <!-- <svg style="enable-background:new 0 0 20 20;color: aliceblue;" version="1.1" viewBox="0 0 20 20" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/></svg> -->
                                    ❌
                                </button>
                            </div>
                        </div>
                    </li>

                    <!-- Add button -->
                    <li class="flex justify-center">
                        <button type="button" @click="addCanvas"
                            class="btn font-medium rounded-full text-sm p-2.5 text-center items-center mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                viewBox="0 0 16 16">
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                            <span class="sr-only">Add Canvas</span>
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
        <Canvas ref="canvas" @save="saveCanvas" current-canvas={{currentCanvas}} />
    </div>
</template>

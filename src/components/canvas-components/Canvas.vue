<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Panel from './Panel.vue'

const emit = defineEmits(['save']);

const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<any | null>(null);
const drawing = ref<boolean>(false);
const canvasOffsetX = ref(0);
const canvasOffsetY = ref(0);
const strokeColor = ref('black')

const lineWidth = 5;
const height = 500;
const width = 500;


const draw = (e: MouseEvent) => {
    if (!drawing.value || !canvas.value || !ctx.value) return;
    
    ctx.value.lineWidth = lineWidth;
    ctx.value.lineCap = 'round';
    ctx.value.strokeStyle = strokeColor.value;
    ctx.value.lineTo(e.clientX - canvasOffsetX.value, e.clientY - canvasOffsetY.value);
    ctx.value.stroke();
}

const end = () => {
    drawing.value = false;
    ctx.value.stroke();
    ctx.value.beginPath();
    saveCanvas();
}

const setOffsets = () => {
    const viewportOffset = canvas.value?.getBoundingClientRect();
    // these are relative to the viewport, i.e. the window
    canvasOffsetX.value = Math.floor(viewportOffset?.left ?? 0);
    canvasOffsetY.value = Math.floor(viewportOffset?.top ?? 0);
}

const setupCanvas = () => {
    if (!canvas.value || !ctx.value) return;
    canvas.value.width = height;
    canvas.value.height = width;
    setOffsets()
}

const saveCanvas = () => {
    if (!canvas.value) return;
    
    const dataUrl = canvas.value.toDataURL();
    //localStorage.setItem('canvasDataUrl', dataUrl);
    emit('save', dataUrl);
};

const loadCanvas = (dataUrl: string) => {
    if (!canvas.value) return;
    
    //const dataUrl = localStorage.getItem('canvasDataUrl');
    if (!dataUrl) return;
    
    const img = new Image();
    img.onload = () => {
        ctx.value?.drawImage(img, 0, 0);
    };
    img.src = dataUrl;
    setupCanvas()
    
    drawing.value = false;
    ctx.value.stroke();
    ctx.value.beginPath();
};

const clear = () => {
    if (!canvas.value || !ctx.value) return;
    ctx.value.clearRect(0, 0, width, height)
}


defineExpose({loadCanvas, saveCanvas});

onMounted(() => {
    ctx.value = canvas.value?.getContext('2d');
    setupCanvas()
    saveCanvas();
    window.addEventListener("resize", setOffsets);
})


</script>

<template>
    <div class="h-screen w-screen">
        <div class="flex flex-col justify-center items-center h-full w-full" ref="canvasContainer">
            <div>
                <canvas class="shadow-xl border-2 border-gray-100 rounded-md" width="{{width}}" height="{{height}}"
                ref="canvas" @mousemove="draw" @mousedown="drawing = true" @mouseup="end"></canvas>
                <Panel @change-color="strokeColor = $event" @clear="clear"/>
            </div>
        </div>
    </div>
</template>

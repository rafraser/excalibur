<template>
    <div class="pane" ref="pane">
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { scene } from '../scene';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface PaneProps {
    camera: THREE.Camera
}
const props = defineProps<PaneProps>();

const pane = ref();
const renderer = new THREE.WebGLRenderer();
let controls: OrbitControls;

const resizeObserver = new ResizeObserver((changes) => {
    const { width, height } = changes[0].contentRect;
    renderer.setSize(width, height);
    if (props.camera && props.camera instanceof THREE.PerspectiveCamera) {
        props.camera.aspect = width / height;
        props.camera.updateProjectionMatrix();
    }
});

function animate() {
    if (!pane.value) return;
    requestAnimationFrame(animate);
    renderer.render(scene, props.camera);
}

onMounted(() => {
    controls = new OrbitControls(props.camera, renderer.domElement);
    pane.value.appendChild(renderer.domElement);
    resizeObserver.observe(pane.value);

    // Everything is ready, start the animation loop
    animate();
});

onUnmounted(() => {
    controls.dispose();
});
</script>
<template>
    <div class="panesplitter">
        <WorldPane :camera="defaultCamera()"/>
        <WorldPane :camera="defaultCamera()"/>
        <WorldPane :camera="defaultCamera()"/>
        <WorldPane :camera="defaultCamera()"/>
    </div>
</template>

<script setup>
import WorldPane from './WorldPane.vue';
import * as THREE from 'three';
import { onMounted } from '@vue/runtime-core';
import { resetScene, createSceneAmbience, createDefaultSceneGeometry } from '../scene';

// Scene management will also quite likely need to be global
// since it'll be touched pretty much everywhere
// Global config -> probably need to edit skybox etc.
// Load a file -> definitely edit scene
// Save/load -> serialize scene
// Interact with map -> add/remove from scene

// plenty to do, so little time!

function defaultCamera() {
    const camera = new THREE.PerspectiveCamera(90, 1);
    camera.position.z = 3;
    camera.position.y = 3;
    return camera;
}

onMounted(() => {
    resetScene();
    createSceneAmbience();
    createDefaultSceneGeometry();
});
</script>

<style>
.panesplitter {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    width: 100%;
    height: 100%;
}

.pane {
    box-sizing: border-box;
    border: 1px solid white;
    width: 50%;
    height: 50%;
}
</style>
<template>
    <div class="panesplitter">
        <div class="pane" ref="pane1"></div>
        <div class="pane" ref="pane2"></div>
        <div class="pane" ref="pane3"></div>
        <div class="pane" ref="pane4"></div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// TODO: Move these panes into seperate components
// I think the ideal structure for this app is something like:
// - Scene: Lives in global store
// - PaneManager etc: Manages interaction panes
// - Pane: Has camera details, manages it's own pane element
// That way we can manage viewports independently from the scene itself

// Scene management will also quite likely need to be global
// since it'll be touched pretty much everywhere
// Global config -> probably need to edit skybox etc.
// Load a file -> definitely edit scene
// Save/load -> serialize scene
// Interact with map -> add/remove from scene

// plenty to do, so little time!

const pane1 = ref();
const pane2 = ref();
const pane3 = ref();
const pane4 = ref();
const panes = [pane1, pane2, pane3, pane4];

const renderers = [
    new THREE.WebGLRenderer(),
    new THREE.WebGLRenderer(),
    new THREE.WebGLRenderer(),
    new THREE.WebGLRenderer()
];

const cameras = [
    createCamera(),
    createCamera(),
    createCamera(),
    createCameraTwo()
]

const scene = createScene();

const resizeObserver = new ResizeObserver((changes) => {
    changes.forEach((change, idx) => {
        const { width, height } = changes[0].contentRect;
        renderers[idx].setSize(width, height);
        cameras[idx].aspect = width / height;
        cameras[idx].updateProjectionMatrix();
    });
});

function createScene() {
    const scene = new THREE.Scene();

    // Create a cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Grid
    const size = 16; const cells = 4;
    const grid = new THREE.GridHelper(size * cells, size, 0xaaaaaa, 0xffffff);
    grid.position.y -= 0.5;
    scene.add(grid);

    // Lights
    scene.add(new THREE.AmbientLight(0x222222));

    const spotlight = new THREE.DirectionalLight(0xffffff, 1);
    spotlight.position.set(80, 80, 0);
    scene.add(spotlight);

    scene.background = new THREE.Color(0x37C6FF);
    scene.fog = new THREE.FogExp2(0x37C6FF, 0.05);
    return scene;
}

function createCamera() {
    const camera = new THREE.PerspectiveCamera(90, 1);
    camera.position.z = 5;
    camera.position.y = 2;
    return camera;
}

function createCameraTwo() {
    const camera = new THREE.OrthographicCamera();
    camera.position.y = 25;
    return camera;
}

function animate() {
    requestAnimationFrame(animate);

    renderers.forEach((renderer, idx) => {
        renderer.render(scene, cameras[idx]);
    });
}

onMounted(() => {
    renderers.forEach((renderer, idx) => {
        panes[idx].value.appendChild(renderer.domElement);
        let controls = new OrbitControls(cameras[idx], renderer.domElement);
        resizeObserver.observe(panes[idx].value);
    });
    animate();
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
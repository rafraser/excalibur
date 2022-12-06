import * as THREE from "three";
import { Solid } from "../geometry/Solid";

export let scene = new THREE.Scene();

export function createDefaultSceneGeometry() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
}

export function createSceneAmbience() {
  const bgColor = 0x0097e6;
  scene.background = new THREE.Color(bgColor);
  // scene.fog = new THREE.FogExp2(bgColor, 0.005);

  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x333333);
  hemisphereLight.position.set(0, 20, 0);
  scene.add(hemisphereLight);

  // Grid
  const size = 16;
  const cells = 4;
  const grid = new THREE.GridHelper(size * cells, size, 0xaaaaaa, 0xffffff);
  grid.position.y -= 0.5;
  scene.add(grid);
}

export function addSolid(solid: Solid) {
  const geometry = solid.toThreeGeometry();
  const material = new THREE.MeshLambertMaterial({ color: 0xccccff });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

export function resetScene() {
  scene = new THREE.Scene();
}
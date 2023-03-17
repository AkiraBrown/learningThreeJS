"use strict";

import * as THREE from "three";

//import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, //This is the Field of view parameter aka(FOV)
  window.innerWidth / window.innerHeight, //This is the aspect ratio
  0.1, //This is a near attribute
  1000 //This is a far attribute
  //Objects less than 0.1 or greater than 100 will not be rendered. This may need to be adjusted depending on the extent of the project
);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth / 2, window.innerHeight / 2, false); //The render is using the whole space to render out the scene. You can also give a custom value
document.body.appendChild(renderer.domElement);
//const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function cubeHandler() {
  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;
}

function animate() {
  cubeHandler();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

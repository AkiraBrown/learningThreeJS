"use strict";

import * as THREE from "three";
import { OrbitControls } from "https://unpkg.com/three@0.150.1/examples/jsm/controls/OrbitControls.js";

// import * as dat from "dat.gui";

//Debug
// const gui = new dat.GUI();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, //This is the Field of view parameter aka(FOV)
  window.innerWidth / window.innerHeight, //This is the aspect ratio
  0.1, //This is a near attribute
  1000 //This is a far attribute
  //Objects less than 0.1 or greater than 100 will not be rendered. This may need to be adjusted depending on the extent of the project
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight, false); //The render is using the whole space to render out the scene. You can also give a custom value
camera.position.setZ(30);
document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

//--------------------------Creating the shape---------------------//
/*
const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
const torusKnotGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const edges = new THREE.EdgesGeometry(boxGeometry);
const complexMat = new THREE.MeshPhysicalMaterial({ color: 0xf00f0 });
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const torusKnot = new THREE.Mesh(torusKnotGeometry, material);

const line = new THREE.LineSegments(
  edges,
  new THREE.LineBasicMaterial({ color: 0xfffff })
);
const cube = new THREE.Mesh(boxGeometry, material);
*/
//-----------------------------------------------------------------------//
//----------call into scene-------------//
//scene.add(line);
//scene.add(cube);
// scene.add(torusKnot);

// camera.position.z = 90;

/*
function cubeHandler() {
  cube.rotation.x += 0.05;
  cube.rotation.y += 0.1;
}
*/

//-----------------Creates a star and gives the star a random coordinate to spawn at--------------------//
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);
//------------Loads an Image as the background of the scene---------------//

const spaceTexture = new THREE.TextureLoader().load("./Images/space.jpeg");
scene.background = spaceTexture;
//---------------------------------------------------------//
const akiraTexture = new THREE.TextureLoader().load("./Images/Akira.jpg");
const akira = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: akiraTexture })
);
scene.add(akira);

//-----------------------Create Moon---------------------------//
const moonTexture = new THREE.TextureLoader().load("./Images/Moon.jpeg");
const normalTexture = new THREE.TextureLoader().load("./Images/normal.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture })
);
scene.add(moon);

//------------------------Function that handles everything to do with the torus shape---------------------//
function torusHandler() {
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
}
//-------------------------------Animates the scene (Important)------------------------------//
function animate() {
  // cubeHandler();
  torusHandler();
  controls.update();

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

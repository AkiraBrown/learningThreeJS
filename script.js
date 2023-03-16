"use strict";

import * as THREE from "three";
import { OrbitControls } from "node_modules/three/addons/controls/OrbitControls.js";
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, render.domElement);

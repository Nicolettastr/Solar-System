import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import './style.css'

//!import images

import starsTexture from './img/stars.jpg';
import moonTexture from './img/moon.jpg';

//! create renderer, scene and camera

const moonDiv = document.getElementById('moonDiv')
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth / 2, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45, window.innerWidth / 2 / window.innerHeight, 0.1, 1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

//! creating lightning

const ambientLigth = new THREE.AmbientLight(0x333333);

scene.add(ambientLigth);

const cubeTexture = new THREE.CubeTextureLoader();
scene.background = cubeTexture.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture
]);

const textureLoader = new THREE.TextureLoader();

//! creating sun

const moonGeometry = new THREE.SphereGeometry(30, 30, 30);
const moonMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load(moonTexture)
});

const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);

const animate = () => {

    moon.rotateY(0.004)
    renderer.render(scene, camera);
  };

  renderer.setAnimationLoop(animate);
  
  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / 2 / window.innerHeight);
  })
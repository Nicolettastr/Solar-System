import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import './style.css'

//!import images

import starsTexture from './img/stars.jpg';
import sunTexture from './img/sun.png';
import mercuryTexture from './img/mercury.jpg';
import venusTexture from './img/venus.jpg';
import earthTexture from './img/earth.jpg';
import marsTexture from './img/mars.jpg';
import jupiterTexture from './img/jupiter.jpg';
import saturnTexture from './img/saturn.jpg';
import saturnRingTexture from './img/saturnRing.png';
import uranusTexture from './img/uranus.jpg';
import uranusRingTexture from './img/uranusRing.png';
import neptuneTexture from './img/neptune.jpg';
import plutoTexture from './img/pluto.jpg';

//! create renderer, scene and camera

const renderer = new THREE.WebGLRenderer();

const width = window.innerWidth;
const height = window.innerHeight;

renderer.setSize(width, height);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45, width / height, 0.1, 1000
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

const sunGeometry = new THREE.SphereGeometry(16, 30, 30);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture)
});

const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

//! planets

const createPlanet = (size, texture, position, ring) => {
  const geo = new THREE.SphereGeometry(size, 30, 30);
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture)
  });

  const mesh = new THREE.Mesh(geo, mat);
  const obj = new THREE.Object3D();
  obj.add(mesh);

  if(ring) {
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    );

    const ringMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide
    });

    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    obj.add(ringMesh);
    ringMesh.position.x = position;
    ringMesh.rotation.x = -0.5 * Math.PI
  }


  scene.add(obj);
  mesh.position.x = position;

  const planetId = mesh.id;

  return {mesh, obj, planetId}
}

const mercury = createPlanet(3.2, mercuryTexture, 28);
const venus = createPlanet(5.8, venusTexture, 44);
const earth = createPlanet(6, earthTexture, 62);
const mars = createPlanet(4, marsTexture, 78);
const jupiter = createPlanet(12, jupiterTexture, 100);
const neptune = createPlanet(7, neptuneTexture, 200);
const pluto = createPlanet(2.8, plutoTexture, 216);
const saturn = createPlanet(10, saturnTexture, 138, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture
});
const uranus = createPlanet(7, uranusTexture, 176, {
  innerRadius: 7,
  outerRadius: 12,
  texture: uranusRingTexture
});

//! point light, the constructure takes 4 parameters. we are using 3, the first one is the color, the second is the intensity and the third one is the maximun point light can reach

const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
scene.add(pointLight)

const animate = () => {

  sun.rotateY(0.004);

  //? MESH
  mercury.mesh.rotateY(0.004);
  venus.mesh.rotateY(0.002);
  earth.mesh.rotateY(0.02);
  mars.mesh.rotateY(0.018);
  jupiter.mesh.rotateY(0.04);
  saturn.mesh.rotateY(0.038);
  uranus.mesh.rotateY(0.03);
  neptune.mesh.rotateY(0.032);
  pluto.mesh.rotateY(0.008);


  //? OBJ
  mercury.obj.rotateY(0.04);
  venus.obj.rotateY(0.015);
  earth.obj.rotateY(0.01);
  mars.obj.rotateY(0.008);
  jupiter.obj.rotateY(0.002);
  saturn.obj.rotateY(0.0009)
  uranus.obj.rotateY(0.0004);
  neptune.obj.rotateY(0.0001);
  pluto.obj.rotateY(0.00007);

  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width / height);
})



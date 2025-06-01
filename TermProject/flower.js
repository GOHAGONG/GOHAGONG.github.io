import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { initStats, initCamera, initRenderer, initOrbitControls, 
    initDefaultDirectionalLighting } from './util.js';

const scene = new THREE.Scene();
// scene.background = new THREE.Color( 0x00000 );
const textureLoader = new THREE.TextureLoader();

const urls = [
    './assets/Textures/Background/right.png',
    './assets/Textures/Background/left.png',
    './assets/Textures/Background/top.png',
    './assets/Textures/Background/bottom.png',
    './assets/Textures/Background/front.png',
    './assets/Textures/Background/back.png'
];

var cubeLoader = new THREE.CubeTextureLoader();
scene.background = cubeLoader.load(urls);

var cubeMaterial = new THREE.MeshStandardMaterial({
    envMap: scene.background,
    color: 0xffffff,
    metalness: 1,
    roughness: 0,
});

const renderer = initRenderer();

const camera = initCamera();
camera.position.set( 200, 200, 500 );
scene.add(camera);

initDefaultDirectionalLighting(scene);

const orbitControls = initOrbitControls(camera, renderer);
orbitControls.target.set(0, 0, 0); 
orbitControls.update();

const loader = new GLTFLoader();
loader.load('./assets/models/TestScene.glb', (gltf) => {
  scene.add(gltf.scene);
});

animate();

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
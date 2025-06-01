import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { initStats, initCamera, initRenderer, initOrbitControls, 
    initDefaultDirectionalLighting } from './util.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xB0E0E6 );

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